// Frostbite: Game Core Logic

// 아이템 아이콘/이미지 HTML 반환 헬퍼
function getItemIconHtml(item, size = "2.2rem") {
  if (item && item.image) {
    return `<img src="${item.image}" alt="${item.name}" class="item-img-icon" style="width: ${size}; height: ${size};" />`;
  }
  return item ? item.icon : "📦";
}

// 아이템 데이터베이스 정의
const ITEM_DATABASE = {
  // 기본 재료
  wood: { name: "나뭇가지", icon: "🪵", image: "images/wood.png", desc: "불을 피우거나 도구를 만드는 데 쓰이는 마른 나뭇가지.", usable: false, type: "재료" },
  matches: { name: "성냥", icon: "✨", image: "images/matches.png", desc: "불을 붙이거나 불빛 신호를 보내는 데 사용되는 필수 도구.", usable: false, type: "재료" },
  snow: { name: "눈뭉치", icon: "❄️", image: "images/snow.png", desc: "오염되지 않은 얼어붙은 눈. 끓여서 깨끗한 물로 만들 수 있다.", usable: false, type: "재료" },
  water: { name: "깨끗한 물", icon: "💧", desc: "눈을 끓여 만든 안전한 식수. 포만감과 체온을 미량 회복시킨다.", usable: true, effect: { hunger: 10, warmth: 15, health: 5, sanity: 5 }, type: "음식" },
  raw_meat: { name: "생고기", icon: "🥩", desc: "야생동물에게서 얻은 날고기. 그냥 먹으면 탈이 날 위험이 큽니다.", usable: true, effect: { hunger: 15, health: -10, warmth: -5, sanity: -10 }, type: "음식" },
  cooked_meat: { name: "구운 고기", icon: "🍖", desc: "불에 노릇하게 구워낸 고기. 든든하게 배를 채우고 체력을 줍니다.", usable: true, effect: { hunger: 45, health: 15, warmth: 10, sanity: 10 }, type: "음식" },
  fish: { name: "얼음 물고기", icon: "🐟", desc: "빙판 아래에서 낚아올린 펄떡이는 물고기. 조리하면 유용한 식량이 됩니다.", usable: true, effect: { hunger: 20, health: -5, warmth: -2, sanity: -5 }, type: "음식" },
  cooked_fish: { name: "구운 물고기", icon: "🍢", desc: "노릇하게 구워 낸 향긋한 생선구이. (포만감 +35, 체온 +10, 체력 +10)", usable: true, effect: { hunger: 35, warmth: 10, health: 10, sanity: 15 }, type: "음식" },
  egg: { name: "야생 새알", icon: "🥚", desc: "추위를 뚫고 발견한 영양가 높은 새의 알. 조리해 단백질을 보충할 수 있습니다.", usable: true, effect: { hunger: 15, health: 5, warmth: 2, sanity: 2 }, type: "음식" },
  boiled_egg: { name: "삶은 새알", icon: "🍳", desc: "따뜻하게 삶아낸 새알 요리. (포만감 +30, 체력 +15)", usable: true, effect: { hunger: 30, health: 15, warmth: 10, sanity: 10 }, type: "음식" },
  hide: { name: "짐승 가죽", icon: "🐺", image: "images/hide.png", desc: "야생동물의 털가죽. 텐트나 방한용 피복의 주원료.", usable: false, type: "재료" },
  metal: { name: "고철 조각", icon: "🔩", image: "images/metal.png", desc: "난파선이나 기지 잔해에서 뜯어낸 튼튼한 쇳조각.", usable: false, type: "재료" },
  herb: { name: "약초", icon: "🌿", image: "images/herb.png", desc: "추위를 견디며 자란 희귀한 치료 풀잎. 상처를 가볍게 치유합니다.", usable: true, effect: { health: 10, sanity: 5 }, type: "의료품" },
  herb_tea: { name: "약초 달인 차", icon: "🍵", desc: "약초와 깨끗한 물을 끓여 만든 따뜻한 차. 체온과 정신력을 회복시킵니다.", usable: true, effect: { warmth: 25, sanity: 20, health: 10 }, type: "음식" },
  cloth: { name: "깨끗한 천", icon: "🧣", image: "images/cloth.png", desc: "기지 시트나 찢어진 옷감에서 나온 단열용 천 조각.", usable: false, type: "재료" },
  
  // 특수 제작 소모품
  campfire: { name: "모닥불", icon: "🔥", desc: "땔감으로 활활 타오르는 화로. 들고 다니며 즉시 체온을 대폭 회복합니다.", usable: true, effect: { warmth: 45, sanity: 15 }, type: "소모품" },
  spear: { name: "철제 창", icon: "🔱", desc: "맹수 사냥 및 호신용 창. 전투 시 플레이어 공격력 +25.", usable: false, type: "무기", atk: 25 },
  tent: { name: "간이 텐트", icon: "⛺", desc: "소지하고 있을 때 '안전 휴식'의 효율을 대폭 증대시켜 줍니다. (영구 보관)", usable: false, type: "중요" },
  medkit: { name: "구급상자", icon: "➕", desc: "소독약과 붕대, 진통제가 들어있는 의료 상자. 체력을 크게 회복합니다.", usable: true, effect: { health: 50, sanity: 20 }, type: "의료품" },

  // 신규 재료 아이템
  wire: { name: "구리선", icon: "🔌", image: "images/wire.png", desc: "기계 장치나 케이블에서 추출한 피복 전선.", usable: false, type: "재료" },
  flint: { name: "부싯돌", icon: "🪨", image: "images/flint.png", desc: "단단하게 굳어 날카로운 불꽃을 일으킬 수 있는 돌멩이.", usable: false, type: "재료" },
  coal: { name: "석탄", icon: "🌑", image: "images/coal.png", desc: "화력이 매우 강하고 오래 타는 극지의 에너지 광석.", usable: false, type: "재료" },
  feather: { name: "깃털", icon: "🪶", image: "images/feather.png", desc: "조류의 둥지 등에서 획득한 방한 효과가 뛰어난 솜깃털.", usable: false, type: "재료" },
  tendon: { name: "동물 힘줄", icon: "🧶", image: "images/tendon.png", desc: "야생동물에게서 얻은 매우 질긴 실 형태의 섬유질.", usable: false, type: "재료" },
  scrap_circuit: { name: "고장난 회로", icon: "📟", image: "images/scrap_circuit.png", desc: "군용 장비나 기계 부속에서 떼어낸 전자 기판 회로.", usable: false, type: "재료" },
  
  // 신규 2차 가공 재료 추가
  steel_plate: { name: "강철 판재", icon: "🧱", image: "images/steel_plate.png", desc: "고철 조각을 녹여서 단단하고 판판하게 두드려 제련한 철판.", usable: false, type: "재료" },
  electric_motor: { name: "전동 모터", icon: "⚙️", image: "images/electric_motor.png", desc: "회로와 고철, 전선을 정교하게 결합한 회전식 동력 모터.", usable: false, type: "재료" },
  energy_core: { name: "에너지 코어", icon: "🔮", image: "images/energy_core.png", desc: "회로 부속과 석탄, 전선을 얽어 소형 발전기로 작동시키는 핵심 코어.", usable: false, type: "재료" },

  // 신규 무기류 16종 추가 (밸런스 및 2차 제작 설명 반영)
  stone_knife: { name: "뾰족한 돌칼", icon: "🔪", desc: "단단한 돌을 갈아 만든 임시 호신용 칼. (공격력 +6)", usable: false, type: "무기", atk: 6 },
  bone_dagger: { name: "뼈단검", icon: "🗡️", desc: "짐승의 뼈를 갈아서 매우 뾰족하게 다듬은 단검. (공격력 +9)", usable: false, type: "무기", atk: 9 },
  scrap_axe: { name: "고철 도끼", icon: "🪓", desc: "쇠파이프와 고철 날을 덧대어 묵직하게 조립한 손도끼. (공격력 +14)", usable: false, type: "무기", atk: 14 },
  hunting_bow: { name: "사냥용 활", icon: "🏹", desc: "나뭇가지와 튼튼한 동물 힘줄로 엮어 만든 활. (공격력 +18)", usable: false, type: "무기", atk: 18 },
  barbed_club: { name: "가시 몽둥이", icon: "🏏", desc: "나무 몽둥이에 고철 가시와 구리선을 칭칭 감아 위력을 더했습니다. (공격력 +20)", usable: false, type: "무기", atk: 20 },
  iron_sword: { name: "제련된 철검", icon: "⚔️", desc: "강철 판재를 뜨겁게 달구어 날카롭고 견고하게 벼려낸 검. (공격력 +26)", usable: false, type: "무기", atk: 26 },
  heavy_mace: { name: "중량 메이스", icon: "🔨", desc: "머리 부분에 무거운 강철 판재 뭉치를 결합한 둔기. (공격력 +32)", usable: false, type: "무기", atk: 32 },
  harpoon: { name: "고래 작살", icon: "🔱", desc: "고대 고래잡이에 썼던 것 같은 견고하고 갈고리진 날의 창. (공격력 +38)", usable: false, type: "무기", atk: 38 },
  machete: { name: "생존자 정글도", icon: "🗡️", desc: "두껍고 넓은 날을 가진 만능 칼. 날이 날카롭고 매섭습니다. (공격력 +42)", usable: false, type: "무기", atk: 42 },
  crossbow: { name: "기계식 석궁", icon: "🏹", desc: "사냥용 활에 고철판과 방아쇠 장치를 더해 위력을 강화한 석궁. (공격력 +50)", usable: false, type: "무기", atk: 50 },
  chainsaw_sword: { name: "톱날 회전검", icon: "⚙️", desc: "철검의 날에 전동 모터를 연동하여 톱날이 회전하는 강력한 무기. (공격력 +60)", usable: false, type: "무기", atk: 60 },
  shock_baton: { name: "전술 충격봉", icon: "⚡", desc: "도끼의 충격량에 에너지 코어와 전동 모터의 전력을 결합한 충격봉. (공격력 +70)", usable: false, type: "무기", atk: 70 },
  plasma_cutter: { name: "플라즈마 절단기", icon: "🔦", desc: "에너지 코어와 강철 판재를 결합해 철판도 쉽게 베어내는 광선 절단기. (공격력 +82)", usable: false, type: "무기", atk: 82 },
  polar_titan_lance: { name: "타이탄 랜스", icon: "🔱", desc: "고래 작살에 여러 개의 에너지 코어를 조율해 기갑 관통력을 실은 창. (공격력 +95)", usable: false, type: "무기", atk: 95 },
  alloy_greatsword: { name: "합금 대검", icon: "🗡️", desc: "철검을 강철 판재로 덧씌우고 보강하여 한 손으로 휘두르기 버거운 대검. (공격력 +110)", usable: false, type: "무기", atk: 110 },
  laser_scythe: { name: "레이저 낫", icon: "🛸", desc: "작살 날을 베이스로 다수의 에너지 코어 광선을 뿜는 초고테크 전투용 낫. (공격력 +130)", usable: false, type: "무기", atk: 130 },

  // 신규 장비류 - 머리 (의복)
  hat_wool: { name: "털모자", icon: "🧶", desc: "천으로 짠 가볍고 부드러운 방한 모자. (방한 +2)", equippable: true, slot: "head", stats: { defense: 1, warmth_retention: 2, health: 5 }, type: "방어구" },
  hat_scraps: { name: "고철 헬멧", icon: "🪖", desc: "고철을 엮어 만든 투박한 호신용 헬멧. (방어 +4)", equippable: true, slot: "head", stats: { defense: 4, warmth_retention: 0, health: 10 }, type: "방어구" },
  hat_fur: { name: "가죽 털모자", icon: "🐻", desc: "동물의 가죽으로 머리 전체를 뒤덮는 단열 모자. (방어 +2, 방한 +3)", equippable: true, slot: "head", stats: { defense: 2, warmth_retention: 3, health: 8 }, type: "방어구" },
  hat_goggles: { name: "생존자 고글", icon: "🥽", desc: "눈보라 속 시야 확보에 유리하고 보온이 내장된 특수 고글. (방어 +1, 방한 +2)", equippable: true, slot: "head", stats: { defense: 1, warmth_retention: 2, health: 5 }, type: "방어구" },
  hat_fox: { name: "북극여우 모자", icon: "🦊", desc: "북극여우 털로 장식한 모자. (방한 +4, 펫 길들이기 확률 10% 보너스)", equippable: true, slot: "head", stats: { defense: 2, warmth_retention: 4, tame_bonus: 0.1, health: 8 }, type: "방어구" },
  hat_bear: { name: "북극곰 헬멧", icon: "🐼", desc: "북극곰의 머리뼈 and 통가죽을 얹은 중무장 투구. (방어 +6, 방한 +5)", equippable: true, slot: "head", stats: { defense: 6, warmth_retention: 5, health: 25 }, type: "방어구" },
  hat_feather: { name: "깃털 방한모", icon: "🪶", desc: "깃털을 촘촘히 엮어 만든 방한모. (방어 +1, 방한 +3)", equippable: true, slot: "head", stats: { defense: 1, warmth_retention: 3, health: 5 }, type: "방어구" },
  hat_heavy: { name: "강철 판금 헬멧", icon: "🪖", desc: "강철을 덧대 무겁지만 튼튼한 헬멧. (방어 +7, 방한 -1)", equippable: true, slot: "head", stats: { defense: 7, warmth_retention: -1, health: 15 }, type: "방어구" },

  // 신규 장비류 - 몸 (의복)
  coat_wool: { name: "단열 천 파카", icon: "🧥", desc: "천을 솜처럼 겹겹이 덧댄 단열 파카. (방한 +4)", equippable: true, slot: "body", stats: { defense: 2, warmth_retention: 4, health: 10 }, type: "방어구" },
  coat_fur: { name: "늑대 가죽 코트", icon: "🐺", desc: "늑대 가죽으로 지은 보온성 최고의 통가죽 코트. (방어 +3, 방한 +6)", equippable: true, slot: "body", stats: { defense: 3, warmth_retention: 6, health: 15 }, type: "방어구" },
  coat_scraps: { name: "고철 판금 조끼", icon: "🛡️", desc: "가슴과 등에 고철을 덧댄 튼튼한 호신용 흉갑. (방어 +8, 방한 -1)", equippable: true, slot: "body", stats: { defense: 8, warmth_retention: -1, health: 20 }, type: "방어구" },
  coat_tactical: { name: "군용 전술 조끼", icon: "🦺", desc: "방탄 재질 and 다기능 주머니가 내장된 군용 장비. (방어 +6, 방한 +3)", equippable: true, slot: "body", stats: { defense: 6, warmth_retention: 3, health: 15 }, type: "방어구" },
  coat_feather: { name: "깃털 다운 재킷", icon: "🦅", desc: "솜털을 아낌없이 채워 넣은 최상급 패딩 재킷. (방한 +8)", equippable: true, slot: "body", stats: { defense: 1, warmth_retention: 8, health: 10 }, type: "방어구" },
  coat_bear: { name: "북극곰 방한 코트", icon: "🐻‍❄️", desc: "북극곰의 질긴 가죽으로 봉제한 명품 코트. (방어 +10, 방한 +10)", equippable: true, slot: "body", stats: { defense: 10, warmth_retention: 10, health: 40 }, type: "방어구" },
  coat_heavy: { name: "수호자 전신 갑옷", icon: "🛡️", desc: "온몸을 단단한 판금으로 감싸 보호하는 중갑옷. (방어 +12, 방한 +2)", equippable: true, slot: "body", stats: { defense: 12, warmth_retention: 2, health: 30 }, type: "방어구" },
  coat_thermal_adv: { name: "나노 방열 파카", icon: "🧥", desc: "구리 배선과 발열재로 온기를 보존하는 파카. (방어 +4, 방한 +12)", equippable: true, slot: "body", stats: { defense: 4, warmth_retention: 12, health: 15 }, type: "방어구" },

  // 신규 장비류 - 다리 (의복)
  pants_wool: { name: "털바지", icon: "👖", desc: "양털처럼 부드럽고 가벼운 보온 바지. (방한 +2)", equippable: true, slot: "legs", stats: { defense: 1, warmth_retention: 2, health: 5 }, type: "방어구" },
  pants_fur: { name: "털가죽 바지", icon: "🐆", desc: "짐승의 모피를 안감으로 덧댄 질긴 가죽 바지. (방어 +2, 방한 +4)", equippable: true, slot: "legs", stats: { defense: 2, warmth_retention: 4, health: 8 }, type: "방어구" },
  pants_scraps: { name: "고철 다리 보호대", icon: "🦵", desc: "무릎과 정강이에 고철판을 덧댄 정강이 보호대. (방어 +5)", equippable: true, slot: "legs", stats: { defense: 5, warmth_retention: 0, health: 10 }, type: "방어구" },
  pants_combat: { name: "군용 전술 바지", icon: "🩳", desc: "신축성과 방어 성능이 조화를 이룬 작전용 바지. (방어 +4, 방한 +2)", equippable: true, slot: "legs", stats: { defense: 4, warmth_retention: 2, health: 10 }, type: "방어구" },
  pants_thermal: { name: "열선 내복", icon: "👙", desc: "구리 배선과 기판 회로로 약한 열기를 뿜어주는 특수 바지. (방어 +2, 방한 +6)", equippable: true, slot: "legs", stats: { defense: 2, warmth_retention: 6, health: 8 }, type: "방어구" },
  pants_bear: { name: "북극곰 다리싸개", icon: "🧦", desc: "북극곰 가죽을 두텁게 둘러 감싼 하의 장비. (방어 +7, warmth +6)", equippable: true, slot: "legs", stats: { defense: 7, warmth_retention: 6, health: 20 }, type: "방어구" },
  pants_feather: { name: "깃털 다운 바지", icon: "👖", desc: "깃털을 아낌없이 채워 단열 성능을 강화한 바지. (방어 +1, 방한 +7)", equippable: true, slot: "legs", stats: { defense: 1, warmth_retention: 7, health: 5 }, type: "방어구" },
  pants_heavy: { name: "합금 방탄 전투 바지", icon: "👖", desc: "방탄 합금을 덧대 다리를 안전하게 지켜주는 바지. (방어 +8, 방한 +3)", equippable: true, slot: "legs", stats: { defense: 8, warmth_retention: 3, health: 15 }, type: "방어구" },

  // 신규 장비류 - 신발 (의복)
  boots_wool: { name: "털덧신", icon: "🧦", desc: "천을 솜털 모양으로 부드럽게 기워 만든 덧신. (방한 +1)", equippable: true, slot: "feet", stats: { defense: 0, warmth_retention: 1, health: 2 }, type: "방어구" },
  boots_leather: { name: "가죽 장화", icon: "👢", desc: "방수가 뛰어나고 튼튼한 천연 가죽 부츠. (방어 +1, 방한 +2)", equippable: true, slot: "feet", stats: { defense: 1, warmth_retention: 2, health: 5 }, type: "방어구" },
  boots_scraps: { name: "고철 징박힌 장화", icon: "👞", desc: "바닥에 고철 징을 박아 낙상을 방지하고 보호 성능을 높인 장화. (방어 +3)", equippable: true, slot: "feet", stats: { defense: 3, warmth_retention: 0, health: 8 }, type: "방어구" },
  boots_combat: { name: "군용 전술 부츠", icon: "🥾", desc: "군 보급품 전투용 안전화. (방어 +3, 방한 +2)", equippable: true, slot: "feet", stats: { defense: 3, warmth_retention: 2, health: 8 }, type: "방어구" },
  boots_insulated: { name: "단열 부츠", icon: "👟", desc: "가죽 속에 특수 단열솜을 넣어 한기를 완전 차단합니다. (방한 +4)", equippable: true, slot: "feet", stats: { defense: 1, warmth_retention: 4, health: 5 }, type: "방어구" },
  boots_bear: { name: "북극곰 가죽 장화", icon: "🐾", desc: "북극곰 털가죽으로 외부 발한을 단단히 막은 최상급 신발. (방어 +5, 방한 +5)", equippable: true, slot: "feet", stats: { defense: 5, warmth_retention: 5, health: 15 }, type: "방어구" },
  boots_feather: { name: "깃털 다운 덧신", icon: "🧦", desc: "솜털을 가득 기워 만든 매우 따뜻한 덧신. (방어 +0, 방한 +5)", equippable: true, slot: "feet", stats: { defense: 0, warmth_retention: 5, health: 2 }, type: "방어구" },
  boots_heavy: { name: "강철 중보병 전투화", icon: "🥾", desc: "강철 보호판을 장착한 튼튼한 중장비 군화. (방어 +6, 방한 +1)", equippable: true, slot: "feet", stats: { defense: 6, warmth_retention: 1, health: 12 }, type: "방어구" },

  // 가방류 (배낭 확장 장비)
  bag_small: { name: "가죽 보따리", icon: "👜", desc: "가죽을 묶어 허리춤에 매는 주머니. (가방 크기: 18)", equippable: true, slot: "bag", stats: { max_inv: 18, health: 5 }, type: "방어구" },
  bag_medium: { name: "생존자 배낭", icon: "🎒", desc: "천과 끈으로 수납 효율을 높인 어깨 배낭. (가방 크기: 22)", equippable: true, slot: "bag", stats: { max_inv: 22, health: 10 }, type: "방어구" },
  bag_large: { name: "군용 전술 배낭", icon: "🎒", desc: "철제 프레임으로 대량의 물품을 등받이에 고정하는 전술 배낭. (가방 크기: 28, 방어 +2)", equippable: true, slot: "bag", stats: { max_inv: 28, defense: 2, health: 15 }, type: "방어구" },
  bag_thermal: { name: "발열 단열 배낭", icon: "🎒", desc: "단열 원단으로 가방 내부 온도를 가두는 특수 배낭. (가방 크기: 20, 보온 +3)", equippable: true, slot: "bag", stats: { max_inv: 20, warmth_retention: 3, health: 8 }, type: "방어구" },
  bag_tactical: { name: "전술 중장비 배낭", icon: "🎒", desc: "두껍고 튼튼한 금속판이 내장된 특수 대형 배낭. (가방 크기: 30, 방어 +3)", equippable: true, slot: "bag", stats: { max_inv: 30, defense: 3, health: 20 }, type: "방어구" },
  bag_academic: { name: "학자의 전술 가방", icon: "💼", desc: "많은 도서와 서류철을 보관하기 편리한 배낭. (가방 크기: 18, 일지 슬롯 +1)", equippable: true, slot: "bag", stats: { max_inv: 18, journal_slots_bonus: 1, health: 5 }, type: "방어구" },

  // 생활 일지류 (특수 기지 액션 추가) - 책 아이콘 📖 통일
  journal_hunting: { name: "사냥 기록 일지", icon: "📖", desc: "야생동물 동선과 덫 기법이 기재된 일지. 기지 행동 '덫 놓기' 추가.", equippable: true, slot: "journal", stats: { action: "hunt" }, type: "일지" },
  journal_cooking: { name: "조리 기법 일지", icon: "📖", desc: "열량 보존 요리법이 수록된 일지. 기지 행동 '영양 스튜' 추가.", equippable: true, slot: "journal", stats: { action: "cook" }, type: "일지" },
  journal_meditation: { name: "정신 수양 일지", icon: "📖", desc: "극한 극지에서 평정심을 유지하는 법이 담긴 일지. 기지 행동 '명상' 추가.", equippable: true, slot: "journal", stats: { action: "meditate" }, type: "일지" },
  journal_engineering: { name: "정비 공학 일지", icon: "📖", desc: "단열 공학 및 보수 팁이 수록된 일지. 기지 행동 '바람막이 보강' 추가.", equippable: true, slot: "journal", stats: { action: "engineer" }, type: "일지" },
  journal_scouting: { name: "정찰 정보 일지", icon: "📖", desc: "안전 지대와 자원 매립지 정보가 수록된 일지. 기지 행동 '루트 정찰' 추가.", equippable: true, slot: "journal", stats: { action: "scout" }, type: "일지" },
  journal_taming: { name: "동물 조련 일지", icon: "📖", desc: "동물의 심리를 훈련시키는 법이 적힌 일지. 기지 행동 '펫 훈련' 추가.", equippable: true, slot: "journal", stats: { action: "tame" }, type: "일지" },
  journal_thinking: { name: "생각하기 일지", icon: "📖", desc: "영구적인 아이템 제작 도안을 이끌어낼 수 있는 깊은 사색의 일지. 기지 행동 '생각하기' 추가.", equippable: true, slot: "journal", stats: { action: "think" }, type: "일지" },
  journal_friction: { name: "마찰 발화 일지", icon: "📖", desc: "마찰을 이용해 불씨를 지피는 야생 기술이 수록된 일지. 기지 행동 '마찰로 불 피우기' 추가.", equippable: true, slot: "journal", stats: { action: "friction" }, type: "일지" },
  journal_attraction: { name: "이목 유도 일지", icon: "📖", desc: "주변의 주의를 끄는 신호법이 적힌 일지. 장착 시 매 턴 전투 조우 확률 +15%.", equippable: true, slot: "journal", stats: { action: "attract" }, type: "일지" }
};

// 제작 레시피 정의
const CRAFTING_RECIPES = {
  // 기본 조합법 (처음부터 해금됨)
  water: { name: "깨끗한 물", cost: { snow: 1, wood: 1, matches: 1 }, resultQty: 1, locked: false },
  cooked_meat: { name: "구운 고기", cost: { raw_meat: 1, wood: 1, matches: 1 }, resultQty: 1, locked: false },
  cooked_fish: { name: "구운 물고기", cost: { fish: 1, wood: 1, matches: 1 }, resultQty: 1, locked: false },
  boiled_egg: { name: "삶은 새알", cost: { egg: 2, water: 1, wood: 1 }, resultQty: 1, locked: false },
  campfire: { name: "모닥불", cost: { wood: 3, matches: 1 }, resultQty: 1, locked: false },
  herb_tea: { name: "약초 달인 차", cost: { water: 1, herb: 1, matches: 1 }, resultQty: 1, locked: false },

  // 도구 및 가구류 (잠겨있음 - 연구 필요)
  medkit: { name: "구급상자", cost: { herb: 2, cloth: 1 }, resultQty: 1, locked: true },
  spear: { name: "철제 창", cost: { wood: 2, metal: 1, tendon: 1 }, resultQty: 1, locked: true },
  tent: { name: "간이 텐트", cost: { wood: 4, hide: 2, tendon: 2 }, resultQty: 1, locked: true },

  // 무기류 조합법 추가
  // 2차 제작용 가공 재료 조합법 추가
  steel_plate: { name: "강철 판재", cost: { metal: 2, coal: 1, matches: 1 }, resultQty: 1, locked: false },
  electric_motor: { name: "전동 모터", cost: { wire: 2, metal: 1, scrap_circuit: 1 }, resultQty: 1, locked: true },
  energy_core: { name: "에너지 코어", cost: { scrap_circuit: 2, wire: 2, coal: 1 }, resultQty: 1, locked: true },

  // 무기류 조합법 추가 (2차 가공 재료 및 하위 무기 연계 적용)
  stone_knife: { name: "뾰족한 돌칼", cost: { flint: 1, wood: 1 }, resultQty: 1, locked: false },
  bone_dagger: { name: "뼈단검", cost: { tendon: 1, wood: 1 }, resultQty: 1, locked: false },
  scrap_axe: { name: "고철 도끼", cost: { metal: 2, wood: 1 }, resultQty: 1, locked: true },
  hunting_bow: { name: "사냥용 활", cost: { wood: 3, tendon: 2 }, resultQty: 1, locked: true },
  barbed_club: { name: "가시 몽둥이", cost: { wood: 2, wire: 1, metal: 1 }, resultQty: 1, locked: true },
  iron_sword: { name: "제련된 철검", cost: { steel_plate: 2, wood: 1, tendon: 1 }, resultQty: 1, locked: true },
  heavy_mace: { name: "중량 메이스", cost: { steel_plate: 3, wood: 1 }, resultQty: 1, locked: true },
  harpoon: { name: "고래 작살", cost: { steel_plate: 2, tendon: 3, wood: 2 }, resultQty: 1, locked: true },
  machete: { name: "생존자 정글도", cost: { steel_plate: 2, hide: 2 }, resultQty: 1, locked: true },
  crossbow: { name: "기계식 석궁", cost: { hunting_bow: 1, metal: 2, wire: 2 }, resultQty: 1, locked: true },
  chainsaw_sword: { name: "톱날 회전검", cost: { iron_sword: 1, electric_motor: 1, wire: 2 }, resultQty: 1, locked: true },
  shock_baton: { name: "전술 충격봉", cost: { scrap_axe: 1, electric_motor: 1, energy_core: 1 }, resultQty: 1, locked: true },
  plasma_cutter: { name: "플라즈마 절단기", cost: { steel_plate: 2, energy_core: 2, wire: 2 }, resultQty: 1, locked: true },
  polar_titan_lance: { name: "타이탄 랜스", cost: { harpoon: 1, energy_core: 2, tendon: 2 }, resultQty: 1, locked: true },
  alloy_greatsword: { name: "합금 대검", cost: { iron_sword: 1, steel_plate: 4, tendon: 2 }, resultQty: 1, locked: true },
  laser_scythe: { name: "레이저 낫", cost: { harpoon: 1, energy_core: 3, wire: 3 }, resultQty: 1, locked: true },

  // 옷 - 머리류 (잠겨있음 - 연구 필요)
  hat_wool: { name: "털모자", cost: { cloth: 2, tendon: 1 }, resultQty: 1, locked: true },
  hat_scraps: { name: "고철 헬멧", cost: { metal: 2, wire: 1 }, resultQty: 1, locked: true },
  hat_fur: { name: "가죽 털모자", cost: { hide: 1, tendon: 1 }, resultQty: 1, locked: true },
  hat_goggles: { name: "생존자 고글", cost: { metal: 1, scrap_circuit: 1 }, resultQty: 1, locked: true },
  hat_fox: { name: "북극여우 모자", cost: { hide: 2, feather: 2 }, resultQty: 1, locked: true },
  hat_bear: { name: "북극곰 헬멧", cost: { hide: 3, metal: 1 }, resultQty: 1, locked: true },
  hat_feather: { name: "깃털 방한모", cost: { feather: 3, cloth: 1, tendon: 1 }, resultQty: 1, locked: true },
  hat_heavy: { name: "강철 판금 헬멧", cost: { metal: 4, wire: 2 }, resultQty: 1, locked: true },

  // 옷 - 몸류 (잠겨있음 - 연구 필요)
  coat_wool: { name: "단열 천 파카", cost: { cloth: 3, tendon: 1 }, resultQty: 1, locked: true },
  coat_fur: { name: "늑대 가죽 코트", cost: { hide: 2, cloth: 1 }, resultQty: 1, locked: true },
  coat_scraps: { name: "고철 판금 조끼", cost: { metal: 3, wire: 2 }, resultQty: 1, locked: true },
  coat_tactical: { name: "군용 전술 조끼", cost: { cloth: 2, metal: 2, scrap_circuit: 1 }, resultQty: 1, locked: true },
  coat_feather: { name: "깃털 다운 재킷", cost: { feather: 6, cloth: 2 }, resultQty: 1, locked: true },
  coat_bear: { name: "북극곰 방한 코트", cost: { hide: 4, tendon: 2 }, resultQty: 1, locked: true },
  coat_heavy: { name: "수호자 전신 갑옷", cost: { metal: 6, wire: 3, tendon: 2 }, resultQty: 1, locked: true },
  coat_thermal_adv: { name: "나노 방열 파카", cost: { cloth: 4, scrap_circuit: 2, wire: 2 }, resultQty: 1, locked: true },

  // 옷 - 다리류 (잠겨있음 - 연구 필요)
  pants_wool: { name: "털바지", cost: { cloth: 2, tendon: 1 }, resultQty: 1, locked: true },
  pants_fur: { name: "털가죽 바지", cost: { hide: 2 }, resultQty: 1, locked: true },
  pants_scraps: { name: "고철 다리 보호대", cost: { metal: 2, wire: 1 }, resultQty: 1, locked: true },
  pants_combat: { name: "군용 전술 바지", cost: { cloth: 2, metal: 1 }, resultQty: 1, locked: true },
  pants_thermal: { name: "열선 내복", cost: { cloth: 2, wire: 2, scrap_circuit: 1 }, resultQty: 1, locked: true },
  pants_bear: { name: "북극곰 다리싸개", cost: { hide: 3, tendon: 1 }, resultQty: 1, locked: true },
  pants_feather: { name: "깃털 다운 바지", cost: { feather: 4, cloth: 2 }, resultQty: 1, locked: true },
  pants_heavy: { name: "합금 방탄 전투 바지", cost: { metal: 3, cloth: 2, wire: 1 }, resultQty: 1, locked: true },

  // 옷 - 신발류 (잠겨있음 - 연구 필요)
  boots_wool: { name: "털덧신", cost: { cloth: 2 }, resultQty: 1, locked: true },
  boots_leather: { name: "가죽 장화", cost: { hide: 2 }, resultQty: 1, locked: true },
  boots_scraps: { name: "고철 징박힌 장화", cost: { metal: 2, wire: 1 }, resultQty: 1, locked: true },
  boots_combat: { name: "군용 전술 부츠", cost: { cloth: 1, metal: 1, tendon: 1 }, resultQty: 1, locked: true },
  boots_insulated: { name: "단열 부츠", cost: { cloth: 2, hide: 1 }, resultQty: 1, locked: true },
  boots_bear: { name: "북극곰 가죽 장화", cost: { hide: 2, tendon: 2 }, resultQty: 1, locked: true },
  boots_feather: { name: "깃털 다운 덧신", cost: { feather: 3, cloth: 1 }, resultQty: 1, locked: true },
  boots_heavy: { name: "강철 중보병 전투화", cost: { metal: 3, tendon: 1 }, resultQty: 1, locked: true },

  // 가방류 (잠겨있음 - 연구 필요)
  bag_small: { name: "가죽 보따리", cost: { hide: 1, tendon: 1 }, resultQty: 1, locked: true },
  bag_medium: { name: "생존자 배낭", cost: { cloth: 3, tendon: 2 }, resultQty: 1, locked: true },
  bag_large: { name: "군용 전술 배낭", cost: { cloth: 4, metal: 2, wire: 2 }, resultQty: 1, locked: true },
  bag_thermal: { name: "발열 단열 배낭", cost: { cloth: 4, coal: 2, wire: 1 }, resultQty: 1, locked: true },
  bag_tactical: { name: "전술 중장비 배낭", cost: { cloth: 5, metal: 4, wire: 2 }, resultQty: 1, locked: true },
  bag_academic: { name: "학자의 전술 가방", cost: { cloth: 3, hide: 2, tendon: 1 }, resultQty: 1, locked: true }
};

const BADGE_CLASS_MAP = {
  "재료": "badge-material",
  "음식": "badge-food",
  "일지": "badge-journal",
  "방어구": "badge-armor",
  "중요": "badge-important",
  "의료품": "badge-medical",
  "소모품": "badge-consumable",
  "무기": "badge-weapon"
};

const RUINS_EVENT_DATA = {
  id: "ev_ruins_explore",
  title: "고대 극지 유적지 발견",
  description: "눈길을 헤쳐나가던 중, 빙하 밑에 묻혀 있던 고대 에스키모 혹은 정체 모를 고대 문명의 유적지를 발견했습니다. 이곳의 제단에 특정 재료 1개를 바치면, 그에 맞는 신비로운 무기 또는 방어구 2개를 무작위가 아닌 확정으로 지급받을 수 있는 것 같습니다.",
  type: "탐험"
};

const RUINS_OFFERING_MAP = {
  wood: { name: "나뭇가지", icon: "🪵", rewards: ["spear", "boots_scraps"] },
  hide: { name: "짐승 가죽", icon: "🐺", rewards: ["coat_fur", "hat_fur"] },
  metal: { name: "고철 조각", icon: "🔩", rewards: ["spear", "hat_scraps"] },
  cloth: { name: "깨끗한 천", icon: "🧣", rewards: ["coat_wool", "boots_wool"] },
  wire: { name: "구리선", icon: "🔌", rewards: ["hat_goggles", "boots_combat"] },
  flint: { name: "부싯돌", icon: "🪨", rewards: ["spear", "boots_scraps"] },
  coal: { name: "석탄", icon: "🌑", rewards: ["bag_thermal", "pants_thermal"] },
  feather: { name: "깃털", icon: "🪶", rewards: ["coat_feather", "hat_fox"] }
};

window.offeringRuins = function(itemId) {
  const mapData = RUINS_OFFERING_MAP[itemId];
  if (!mapData) return;
  
  const success = removeFromInventory(itemId, 1);
  if (!success) {
    showToast("해당 재료가 가방에 없습니다.", "error");
    return;
  }
  
  mapData.rewards.forEach(rewardId => {
    addToInventory(rewardId, 1);
  });
  
  state.currentEvent.chosenResultText = `제단이 찬란한 빛을 내뿜으며 가방 속에 [${mapData.rewards.map(id => ITEM_DATABASE[id].name).join(", ")}]을(를) 내려주었습니다.`;
  state.eventChosen = true;
  
  if (!state.stats) {
    state.stats = { combatsWon: 0, ruinsSacrificed: 0, petAwakenCount: 0 };
  }
  state.stats.ruinsSacrificed++;
  checkAchievements();
  
  updateUI();
  saveGame();
};

// 게임 상태 초기화
let state = {
  health: 100,
  warmth: 100,
  hunger: 100,
  sanity: 100,
  day: 1,
  inventory: [],
  maxInventory: 15,
  currentEvent: null,
  eventChosen: false,
  gameStarted: false,
  gameOver: false,
  dayActionDone: false, // 오늘 탐색/휴식 완료 여부
  
  // 신규 시스템용 상태 추가
  equipment: {
    head: null,
    body: null,
    legs: null,
    feet: null,
    bag: null,
    journals: [null, null, null, null]
  },
  unlockedRecipes: [],
  pets: [],
  pendingAcquisitions: [],
  gold: 30,
  lastMerchantItems: [],
  stats: {
    combatsWon: 0,
    ruinsSacrificed: 0,
    petAwakenCount: 0
  }
};

// DOM 요소 캐싱
const DOM = {
  startScreen: document.getElementById("start-screen"),
  gameScreen: document.getElementById("game-screen"),
  endScreen: document.getElementById("end-screen"),
  combatScreen: document.getElementById("combat-screen"), // 신설
  
  startBtn: document.getElementById("start-btn"),
  restartBtn: document.getElementById("restart-btn"),
  
  dayVal: document.getElementById("day-val"),
  eventDayNum: document.getElementById("event-day-num"),
  
  healthTxt: document.getElementById("health-txt"),
  defenseTxt: document.getElementById("defense-txt"),
  warmthTxt: document.getElementById("warmth-txt"),
  hungerTxt: document.getElementById("hunger-txt"),
  sanityTxt: document.getElementById("sanity-txt"),
  
  healthBar: document.querySelector(".health-bar"),
  warmthBar: document.querySelector(".warmth-bar"),
  hungerBar: document.querySelector(".hunger-bar"),
  sanityBar: document.querySelector(".sanity-bar"),
  
  actionForage: document.getElementById("action-forage"),
  actionRest: document.getElementById("action-rest"),
  
  eventTitle: document.getElementById("event-title"),
  eventDesc: document.getElementById("event-desc"),
  eventOptions: document.getElementById("event-options"),
  
  invCount: document.getElementById("inv-count"),
  inventoryList: document.getElementById("inventory-list"),
  itemDetail: document.getElementById("item-detail"),
  detailName: document.getElementById("detail-name"),
  detailDesc: document.getElementById("detail-desc"),
  detailUseBtn: document.getElementById("detail-use-btn"),
  detailCloseBtn: document.getElementById("detail-close-btn"),
  
  craftingList: document.getElementById("crafting-list"),
  
  endTitle: document.getElementById("end-title"),
  endReason: document.getElementById("end-reason"),
  endDays: document.getElementById("end-days"),
  
  toastContainer: document.getElementById("toast-container"),

  // 전투 UI 관련 DOM 캐싱
  monsterIcon: document.getElementById("monster-icon"),
  monsterName: document.getElementById("monster-name"),
  monsterHpBar: document.getElementById("monster-hp-bar"),
  monsterHpTxt: document.getElementById("monster-hp-txt"),
  combatLog: document.getElementById("combat-log"),
  combatPlayerHpBar: document.getElementById("combat-player-hp-bar"),
  combatPlayerHpTxt: document.getElementById("combat-player-hp-txt"),
  combatActivePetInfo: document.getElementById("combat-active-pet-info"),
  combatPetName: document.getElementById("combat-pet-name"),
  combatPetHpBar: document.getElementById("combat-pet-hp-bar"),
  combatPetHpTxt: document.getElementById("combat-pet-hp-txt"),
  combatBtnAttack: document.getElementById("combat-btn-attack"),
  combatBtnPetAttack: document.getElementById("combat-btn-pet-attack"),
  combatBtnPetSkill: document.getElementById("combat-btn-pet-skill"),
  combatBtnSnowball: document.getElementById("combat-btn-snowball"),
  combatBtnItem: document.getElementById("combat-btn-item"),
  combatBtnEscape: document.getElementById("combat-btn-escape"),
  combatItemSelector: document.getElementById("combat-item-selector"),
  combatItemList: document.getElementById("combat-item-list"),
  combatItemClose: document.getElementById("combat-item-close"),

  // 펫 리스트
  petList: document.getElementById("pet-list"),
  researchSelectorModal: document.getElementById("research-selector-modal"),
  researchItemList: document.getElementById("research-item-list"),
  researchCloseBtn: document.getElementById("research-close-btn"),
  discardSelectorModal: document.getElementById("discard-selector-modal"),
  merchantSelectorModal: document.getElementById("merchant-selector-modal"),
  merchantGoldInfo: document.getElementById("merchant-gold-info"),
  merchantTabBuy: document.getElementById("merchant-tab-buy"),
  merchantTabSell: document.getElementById("merchant-tab-sell"),
  merchantItemList: document.getElementById("merchant-item-list"),
  merchantCloseBtn: document.getElementById("merchant-close-btn"),
  merchantCloseX: document.getElementById("merchant-modal-close-x"),

  // 설정 및 Safe Area 조절
  startSettingsBtn: document.getElementById("start-settings-btn"),
  settingsBtn: document.getElementById("settings-btn"),
  settingsModal: document.getElementById("settings-modal"),
  adjustRatioBtn: document.getElementById("adjust-ratio-btn"),
  settingsCloseBtn: document.getElementById("settings-close-btn"),
  safeAreaAdjuster: document.getElementById("safe-area-adjuster"),
  adjusterConfirmBtn: document.getElementById("adjuster-confirm-btn"),
  adjusterResetBtn: document.getElementById("adjuster-reset-btn"),
  adjusterCancelBtn: document.getElementById("adjuster-cancel-btn"),
  safeAreaBox: document.getElementById("safe-area-box")
};

// 선택된 인벤토리 슬롯 인덱스 및 장비 슬롯 정보 저장
let selectedSlotIdx = null;
let selectedEquipSlotType = null;
let selectedEquipJournalIdx = null;
let combatState = { active: false, monster: null, petSkillUsed: false, enemiesQueue: [] }; // 전투 관련 상태

// 게임 초기 시나리오 세팅 및 리스너 등록
document.addEventListener("DOMContentLoaded", () => {
  DOM.startBtn.addEventListener("click", startGame);
  DOM.restartBtn.addEventListener("click", restartGame);
  
  const resetBtn = document.getElementById("reset-btn");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      if (confirm("정말 모든 세이브 데이터를 초기화하고 처음부터 다시 시작하시겠습니까?")) {
        localStorage.removeItem("frostbite_save");
        location.reload();
      }
    });
  }
  DOM.actionForage.addEventListener("click", forageAction);
  DOM.actionRest.addEventListener("click", restAction);
  DOM.detailCloseBtn.addEventListener("click", closeItemDetail);
  DOM.detailUseBtn.addEventListener("click", useSelectedItem);

  // 전투 액션 리스너 등록
  DOM.combatBtnAttack.addEventListener("click", executePlayerAttack);
  DOM.combatBtnPetAttack.addEventListener("click", executePetAttack);
  DOM.combatBtnPetSkill.addEventListener("click", executePetSkill);
  DOM.combatBtnSnowball.addEventListener("click", executeSnowballAttack);
  DOM.combatBtnItem.addEventListener("click", showCombatItemSelector);
  DOM.combatBtnEscape.addEventListener("click", attemptEscape);
  DOM.combatItemClose.addEventListener("click", hideCombatItemSelector);
  DOM.researchCloseBtn.addEventListener("click", () => {
    DOM.researchSelectorModal.classList.add("hidden");
  });
  
  DOM.merchantTabBuy.addEventListener("click", () => renderMerchantModal("buy"));
  DOM.merchantTabSell.addEventListener("click", () => renderMerchantModal("sell"));
  const closeMerchant = () => {
    DOM.merchantSelectorModal.classList.add("hidden");
  };
  DOM.merchantCloseBtn.addEventListener("click", closeMerchant);
  if (DOM.merchantCloseX) {
    DOM.merchantCloseX.addEventListener("click", closeMerchant);
  }

  const hugeModal = document.getElementById("huge-detail-modal");
  const hugeCloseX = document.getElementById("huge-detail-close-x");
  if (hugeCloseX && hugeModal) {
    hugeCloseX.addEventListener("click", () => {
      hugeModal.classList.add("hidden");
    });
  }
  if (hugeModal) {
    hugeModal.addEventListener("click", (e) => {
      if (e.target === hugeModal) {
        hugeModal.classList.add("hidden");
      }
    });
  }

  // 장비 슬롯 이벤트 연동
  const equipSlots = document.querySelectorAll(".equip-slot");
  equipSlots.forEach(slot => {
    slot.addEventListener("click", () => {
      showEquipItemDetails(slot);
    });
    slot.addEventListener("dblclick", () => {
      showHugeEquipItemDetails(slot);
    });
  });
  
  // 로컬스토리지에 저장된 이전 기록이 있는지 탐색
  const saved = localStorage.getItem("frostbite_save");
  if (saved) {
    try {
      state = JSON.parse(saved);
      // 세이브 데이터 신규 필드 마이그레이션 보장
      if (state.inventory && !Array.isArray(state.inventory)) {
        const newInventory = [];
        for (const [itemId, qty] of Object.entries(state.inventory)) {
          for (let i = 0; i < qty; i++) {
            newInventory.push(itemId);
          }
        }
        state.inventory = newInventory;
      }
      if (!state.equipment) {
        state.equipment = { head: null, body: null, legs: null, feet: null, bag: null, journals: [null, null, null] };
      }
      if (!state.unlockedRecipes) {
        let savedUnlocked = [];
        try {
          const raw = localStorage.getItem("frostbite_unlocked_recipes");
          if (raw) savedUnlocked = JSON.parse(raw);
        } catch(e) {}
        state.unlockedRecipes = savedUnlocked;
      }
      if (!state.pets) {
        state.pets = [];
      }
      if (!state.pendingAcquisitions) {
        state.pendingAcquisitions = [];
      }
      if (state.gold === undefined) {
        state.gold = 30;
      }
      if (!state.lastMerchantItems) {
        state.lastMerchantItems = [];
      }
      if (state.dayActionDone === undefined) {
        state.dayActionDone = false;
      }
      if (!state.stats) {
        state.stats = { combatsWon: 0, ruinsSacrificed: 0, petAwakenCount: 0 };
      }
      if (state.currentEvent && state.currentEvent.id === "ev_merchant" && !state.currentEvent.merchantItems) {
        const tempEv = generateMerchantEvent();
        state.currentEvent.merchantItems = tempEv.merchantItems;
      }
      
      if (state.gameStarted && !state.gameOver) {
        resumeGame();
        return;
      }
    } catch(e) {
      console.error("세이브 로드 오류:", e);
    }
  }

  // 키보드 숫자 선택 단축키 추가
  document.addEventListener("keydown", (e) => {
    if (document.activeElement && (document.activeElement.tagName === "INPUT" || document.activeElement.tagName === "TEXTAREA" || document.activeElement.isContentEditable)) {
      return;
    }
    if (e.key >= "1" && e.key <= "9") {
      const idx = parseInt(e.key) - 1;
      const options = DOM.eventOptions.querySelectorAll("button, .btn-option, .btn");
      if (options && options.length > idx) {
        const btn = options[idx];
        if (btn && !btn.disabled) {
          btn.click();
        }
      }
    }
  });
});

// 토스트 알림 함수
function showToast(message, type = "info") {
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  
  let emoji = "ℹ️";
  if (type === "error") emoji = "⚠️";
  if (type === "success") emoji = "✅";
  
  toast.innerHTML = `<span>${emoji}</span> <span>${message}</span>`;
  DOM.toastContainer.appendChild(toast);
  
  setTimeout(() => {
    toast.remove();
  }, 8000);
}

// 세이브 저장
function saveGame() {
  localStorage.setItem("frostbite_save", JSON.stringify(state));
}

// 게임 시작
function startGame() {
  let savedUnlocked = [];
  try {
    const raw = localStorage.getItem("frostbite_unlocked_recipes");
    if (raw) savedUnlocked = JSON.parse(raw);
  } catch(e) {}

  state = {
    health: 100,
    warmth: 100,
    hunger: 100,
    sanity: 100,
    day: 1,
    inventory: [
      "matches", "matches", "matches",
      "wood", "wood",
      "snow", "snow"
    ],
    maxInventory: 15,
    currentEvent: null,
    eventChosen: false,
    gameStarted: true,
    gameOver: false,
    activeChainEventId: null,
    equipment: {
      head: null,
      body: null,
      legs: null,
      feet: null,
      bag: null,
      journals: [null, null, null]
    },
    unlockedRecipes: savedUnlocked,
    pets: [],
    pendingAcquisitions: [],
    gold: 30,
    lastMerchantItems: [],
    dayActionDone: false,
    stats: {
      combatsWon: 0,
      ruinsSacrificed: 0,
      petAwakenCount: 0
    }
  };
  
  if (DOM.discardSelectorModal) {
    DOM.discardSelectorModal.classList.add("hidden");
  }
  if (DOM.merchantSelectorModal) {
    DOM.merchantSelectorModal.classList.add("hidden");
  }
  
  DOM.startScreen.classList.remove("active");
  DOM.gameScreen.classList.add("active");
  DOM.endScreen.classList.remove("active");
  DOM.combatScreen.classList.remove("active");
  
  showToast("추락 지점에서 깨어났습니다. 생존을 시작합니다!", "info");
  selectedSlotIdx = null;
  closeItemDetail();
  updateUI();
  saveGame();
}

// 세이브 재개
function resumeGame() {
  DOM.startScreen.classList.remove("active");
  DOM.gameScreen.classList.add("active");
  DOM.endScreen.classList.remove("active");
  DOM.combatScreen.classList.remove("active");
  showToast("이전 생존 기록을 불러왔습니다.", "success");
  updateUI();
}

// 다시 시작
function restartGame() {
  startGame();
}

// 인벤토리 무게/개수 계산
function getInventoryCount() {
  return state.inventory.length;
}

// 인벤토리에 아이템 추가
function addToInventory(itemId, qty = 1) {
  discoverItem(itemId); // 도감 발견 처리
  let addedCount = 0;
  let overflowCount = 0;
  
  if (!state.pendingAcquisitions) {
    state.pendingAcquisitions = [];
  }
  
  for (let i = 0; i < qty; i++) {
    const currentCount = getInventoryCount();
    if (currentCount < state.maxInventory) {
      state.inventory.push(itemId);
      addedCount++;
    } else {
      state.pendingAcquisitions.push(itemId);
      overflowCount++;
    }
  }
  
  if (addedCount > 0) {
    showToast(`${ITEM_DATABASE[itemId].name} ${addedCount}개 획득!`, "success");
  }
  
  if (overflowCount > 0) {
    showToast(`배낭이 가득 차서 일부 아이템을 챙기지 못했습니다.`, "error");
    processPendingAcquisitions();
  }
  
  updateUI();
  saveGame();
  return overflowCount === 0;
}

// 배낭 오버플로우 대기 큐 처리
function processPendingAcquisitions() {
  if (!state.pendingAcquisitions || state.pendingAcquisitions.length === 0) {
    if (DOM.discardSelectorModal) {
      DOM.discardSelectorModal.classList.add("hidden");
    }
    return;
  }
  
  const nextItem = state.pendingAcquisitions[0];
  renderDiscardSelectorModal(nextItem);
}

// 버릴 물건 선택 화면 렌더링
function renderDiscardSelectorModal(itemId) {
  const itemInfo = ITEM_DATABASE[itemId];
  if (!itemInfo) return;
  
  const titleEl = document.getElementById("discard-modal-title");
  if (titleEl) {
    titleEl.textContent = `배낭 공간 부족 (${state.inventory.length}/${state.maxInventory})`;
  }
  
  const descEl = document.getElementById("discard-modal-desc");
  if (descEl) {
    descEl.innerHTML = `획득하려는 아이템: <strong style="color: var(--color-accent);">${getItemIconHtml(itemInfo, "1.2rem")} ${itemInfo.name}</strong><br>배낭에서 버릴 물건을 선택하거나, 획득을 포기하십시오.`;
  }
  
  const listEl = document.getElementById("discard-backpack-list");
  if (listEl) {
    listEl.innerHTML = "";
    state.inventory.forEach((invItemId, idx) => {
      const invItem = ITEM_DATABASE[invItemId];
      if (!invItem) return;
      const badgeClass = BADGE_CLASS_MAP[invItem.type] || "badge-material";
      const itemDiv = document.createElement("div");
      itemDiv.className = "discard-item-row";
      itemDiv.innerHTML = `
        <div style="display:flex; align-items:center;">
          <span class="discard-item-avatar">${getItemIconHtml(invItem, "2.2rem")}</span>
          <span class="discard-item-name" style="margin-left:8px;">${invItem.name}</span>
        </div>
        <span class="item-badge ${badgeClass}" style="position:static; margin-right:8px; font-size:0.6rem;">${invItem.type}</span>
        <button class="discard-btn" onclick="swapPendingItem(${idx})">버리고 교체</button>
      `;
      listEl.appendChild(itemDiv);
    });
  }
  
  if (DOM.discardSelectorModal) {
    DOM.discardSelectorModal.classList.remove("hidden");
  }
}

// 대기 중인 아이템과 인벤토리 아이템 교체
window.swapPendingItem = function(idx) {
  if (!state.pendingAcquisitions || state.pendingAcquisitions.length === 0) return;
  
  const nextItem = state.pendingAcquisitions.shift();
  const oldItem = state.inventory[idx];
  
  state.inventory[idx] = nextItem;
  
  showToast(`${ITEM_DATABASE[oldItem].name}을(를) 버리고, ${ITEM_DATABASE[nextItem].name}을(를) 획득했습니다.`, "success");
  
  if (DOM.discardSelectorModal) {
    DOM.discardSelectorModal.classList.add("hidden");
  }
  
  updateUI();
  saveGame();
  
  setTimeout(processPendingAcquisitions, 100);
};

// 대기 중인 아이템 포기
window.giveupPendingItem = function() {
  if (!state.pendingAcquisitions || state.pendingAcquisitions.length === 0) return;
  
  const nextItem = state.pendingAcquisitions.shift();
  showToast(`${ITEM_DATABASE[nextItem].name} 획득을 포기했습니다.`, "info");
  
  if (DOM.discardSelectorModal) {
    DOM.discardSelectorModal.classList.add("hidden");
  }
  
  updateUI();
  saveGame();
  
  setTimeout(processPendingAcquisitions, 100);
};

// 인벤토리에서 아이템 제거
function removeFromInventory(itemId, qty = 1) {
  const count = state.inventory.filter(id => id === itemId).length;
  if (count < qty) {
    return false;
  }
  
  let removed = 0;
  for (let i = state.inventory.length - 1; i >= 0; i--) {
    if (state.inventory[i] === itemId) {
      state.inventory.splice(i, 1);
      if (selectedSlotIdx !== null) {
        if (i === selectedSlotIdx) {
          selectedSlotIdx = null;
          closeItemDetail();
        } else if (i < selectedSlotIdx) {
          selectedSlotIdx--;
        }
      }
      removed++;
      if (removed === qty) break;
    }
  }
  return true;
}

// 특정 슬롯 인덱스의 아이템을 제거
function removeAtInventory(idx) {
  if (idx < 0 || idx >= state.inventory.length) return false;
  
  state.inventory.splice(idx, 1);
  if (selectedSlotIdx === idx) {
    selectedSlotIdx = null;
    closeItemDetail();
  } else if (selectedSlotIdx > idx) {
    selectedSlotIdx--;
  }
  return true;
}

// 아이템 소지 개수 확인
function hasItemQty(itemId) {
  return state.inventory.filter(id => id === itemId).length;
}

// UI 전체 업데이트
function updateUI() {
  checkAchievements(); // 도전과제 수시 체크
  // 스탯 수치 텍스트 및 바 갱신
  const maxHp = getPlayerMaxHealth();
  DOM.healthTxt.textContent = `${state.health}/${maxHp}`;
  if (DOM.defenseTxt) {
    DOM.defenseTxt.textContent = getPlayerDefense();
  }
  DOM.warmthTxt.textContent = `${state.warmth}/100`;
  DOM.hungerTxt.textContent = `${state.hunger}/100`;
  DOM.sanityTxt.textContent = `${state.sanity}/100`;
  
  DOM.healthBar.style.width = `${(state.health / maxHp) * 100}%`;
  DOM.warmthBar.style.width = `${state.warmth}%`;
  DOM.hungerBar.style.width = `${state.hunger}%`;
  DOM.sanityBar.style.width = `${state.sanity}%`;
  
  // 상태별 강조 색상 또는 깜빡임 처리 (체력/체온 위험선)
  toggleStatDanger("stat-health", state.health);
  toggleStatDanger("stat-warmth", state.warmth);
  toggleStatDanger("stat-hunger", state.hunger);
  toggleStatDanger("stat-sanity", state.sanity);

  DOM.dayVal.textContent = state.day;
  DOM.eventDayNum.textContent = state.day;
  DOM.invCount.textContent = getInventoryCount();
  
  // 인벤토리 그리드 렌더링
  renderInventory();
  
  // 제작 리스트 렌더링
  renderCrafting();
  
  // 장비 슬롯 렌더링
  renderEquipment();
  
  // 펫 목록 렌더링
  renderPets();
  
  // 이벤트 렌더링
  renderCurrentEvent();
  
  // 기본 행동 버튼 활성 제어
  if ((state.currentEvent && !state.eventChosen) || state.dayActionDone) {
    // 진행 중인 이벤트가 있거나 오늘 이미 탐색/휴식을 한 경우 탐색/휴식 버튼 차단
    DOM.actionForage.disabled = true;
    DOM.actionRest.disabled = true;
  } else {
    DOM.actionForage.disabled = false;
    DOM.actionRest.disabled = false;
  }
}

// 위험 수치 감지 효과
function toggleStatDanger(elementId, val) {
  const el = document.getElementById(elementId);
  if (val <= 20) {
    el.classList.add("danger-blink");
  } else {
    el.classList.remove("danger-blink");
  }
}

// 인벤토리 렌더링
function renderInventory() {
  DOM.inventoryList.innerHTML = "";
  
  // 15개 슬롯 고정 생성
  for (let i = 0; i < state.maxInventory; i++) {
    const slot = document.createElement("div");
    slot.className = "inventory-slot";
    DOM.inventoryList.appendChild(slot);
  }
  
  const slots = DOM.inventoryList.querySelectorAll(".inventory-slot");
  
  state.inventory.forEach((itemId, idx) => {
    if (idx >= slots.length) return;
    const slot = slots[idx];
    const item = ITEM_DATABASE[itemId];
    const badgeClass = BADGE_CLASS_MAP[item.type] || "badge-material";
    
    slot.innerHTML = `
      <span class="item-icon">${getItemIconHtml(item, "2.6rem")}</span>
      <span class="item-badge ${badgeClass}">${item.type}</span>
    `;
    slot.dataset.itemKey = itemId;
    slot.dataset.slotIdx = idx;
    
    if (selectedSlotIdx === idx) {
      slot.classList.add("selected");
    }
    
    slot.addEventListener("click", () => {
      showItemDetails(idx);
    });
    slot.addEventListener("dblclick", () => {
      showHugeItemDetails(idx);
    });
  });
}

// 아이템 단순 선택 (테두리만 변경)
function selectItemSimple(idx) {
  selectedSlotIdx = idx;
  selectedEquipSlotType = null;
  selectedEquipJournalIdx = null;
  
  const slots = DOM.inventoryList.querySelectorAll(".inventory-slot");
  slots.forEach((slot, sIdx) => {
    if (sIdx === idx) {
      slot.classList.add("selected");
    } else {
      slot.classList.remove("selected");
    }
  });
  
  const equipSlots = document.querySelectorAll(".equip-slot");
  equipSlots.forEach(slot => slot.classList.remove("selected"));
}

// 아이템 스탯 요약 문자열 반환 헬퍼
function getItemStatString(item, itemId) {
  let statMsg = "";
  if (item.stats) {
    const s = item.stats;
    if (s.defense !== undefined) statMsg += `🛡️방어+${s.defense} `;
    if (s.warmth_retention !== undefined) statMsg += `🔥보온+${s.warmth_retention} `;
    if (s.health !== undefined) statMsg += `❤️체력+${s.health} `;
    if (s.max_inv !== undefined) statMsg += `🎒가방 ${s.max_inv}칸 `;
    if (s.journal_slots_bonus !== undefined) statMsg += `📖일지+${s.journal_slots_bonus} `;
  }
  if (item.effect) {
    const ef = item.effect;
    if (ef.health !== undefined) statMsg += `❤️체력+${ef.health} `;
    if (ef.warmth !== undefined) statMsg += `🔥체온+${ef.warmth} `;
    if (ef.hunger !== undefined) statMsg += `🍖포만+${ef.hunger} `;
    if (ef.sanity !== undefined) statMsg += `🧠정신+${ef.sanity} `;
  }
  if (itemId === "spear" || (item.type === "무기" && item.atk !== undefined)) {
    const weaponAtk = item.atk || 25;
    statMsg += `🔱공격+${weaponAtk} `;
  }
  return statMsg.trim();
}

// 아이템 더블클릭 상세 보기 (설명 및 스탯 출력)
function showItemDetails(idx) {
  selectedSlotIdx = idx;
  selectedEquipSlotType = null;
  selectedEquipJournalIdx = null;
  
  const equipSlots = document.querySelectorAll(".equip-slot");
  equipSlots.forEach(slot => slot.classList.remove("selected"));
  
  const itemId = state.inventory[idx];
  if (!itemId) return;
  const item = ITEM_DATABASE[itemId];
  
  DOM.detailName.innerHTML = `${getItemIconHtml(item, "2.2rem")} ${item.name}`;
  
  const statMsg = getItemStatString(item, itemId);
  let formattedDesc = item.desc;
  if (statMsg) {
    const detailStatMsg = statMsg.replace(/ /g, "  ");
    formattedDesc += `<br><br><strong style="color:var(--color-accent); font-size:0.8rem;">[아이템 스탯]<br>${detailStatMsg}</strong>`;
  }
  DOM.detailDesc.innerHTML = formattedDesc;
  
  if (item.usable) {
    DOM.detailUseBtn.classList.remove("hidden");
    DOM.detailUseBtn.textContent = "사용";
  } else if (item.equippable) {
    DOM.detailUseBtn.classList.remove("hidden");
    DOM.detailUseBtn.textContent = "장착";
  } else {
    DOM.detailUseBtn.classList.add("hidden");
  }
  
  DOM.itemDetail.classList.remove("hidden");
  
  // 선택 효과 업데이트
  const slots = DOM.inventoryList.querySelectorAll(".inventory-slot");
  slots.forEach((slot, sIdx) => {
    if (sIdx === idx) {
      slot.classList.add("selected");
    } else {
      slot.classList.remove("selected");
    }
  });
}

// 장비 슬롯 단순 선택
function selectEquipSlotSimple(slot) {
  selectedSlotIdx = null;
  const slots = DOM.inventoryList.querySelectorAll(".inventory-slot");
  slots.forEach(s => s.classList.remove("selected"));
  
  const slotType = slot.dataset.slot;
  if (slotType === "journal") {
    const jIdx = parseInt(slot.dataset.idx);
    selectedEquipSlotType = "journal";
    selectedEquipJournalIdx = jIdx;
  } else {
    selectedEquipSlotType = slotType;
    selectedEquipJournalIdx = null;
  }
  
  const equipSlots = document.querySelectorAll(".equip-slot");
  equipSlots.forEach(s => s.classList.remove("selected"));
  slot.classList.add("selected");
}

// 장비 슬롯 더블클릭 상세 보기
function showEquipItemDetails(slot) {
  selectedSlotIdx = null;
  const slots = DOM.inventoryList.querySelectorAll(".inventory-slot");
  slots.forEach(s => s.classList.remove("selected"));
  
  const equipSlots = document.querySelectorAll(".equip-slot");
  equipSlots.forEach(s => s.classList.remove("selected"));
  slot.classList.add("selected");
  
  const slotType = slot.dataset.slot;
  let itemId = null;
  if (slotType === "journal") {
    const jIdx = parseInt(slot.dataset.idx);
    selectedEquipSlotType = "journal";
    selectedEquipJournalIdx = jIdx;
    itemId = state.equipment.journals[jIdx];
  } else {
    selectedEquipSlotType = slotType;
    selectedEquipJournalIdx = null;
    itemId = state.equipment[slotType];
  }
  
  if (!itemId) return;
  const item = ITEM_DATABASE[itemId];
  
  DOM.detailName.innerHTML = `${getItemIconHtml(item, "2.2rem")} ${item.name}`;
  
  const statMsg = getItemStatString(item, itemId);
  let formattedDesc = item.desc;
  if (statMsg) {
    const detailStatMsg = statMsg.replace(/ /g, "  ");
    formattedDesc += `<br><br><strong style="color:var(--color-accent); font-size:0.8rem;">[장착 장비 스탯]<br>${detailStatMsg}</strong>`;
  }
  DOM.detailDesc.innerHTML = formattedDesc;
  
  if (slotType === "journal") {
    DOM.detailUseBtn.classList.add("hidden");
  } else {
    DOM.detailUseBtn.classList.remove("hidden");
    DOM.detailUseBtn.textContent = "해제";
  }
  
  DOM.itemDetail.classList.remove("hidden");
}

// 상세 설명 닫기
function closeItemDetail() {
  DOM.itemDetail.classList.add("hidden");
  selectedSlotIdx = null;
  selectedEquipSlotType = null;
  selectedEquipJournalIdx = null;
  
  const slots = DOM.inventoryList.querySelectorAll(".inventory-slot");
  slots.forEach(slot => slot.classList.remove("selected"));
  
  const equipSlots = document.querySelectorAll(".equip-slot");
  equipSlots.forEach(slot => slot.classList.remove("selected"));
}

// 초대형 상세 보기 모달 열기
function openHugeDetailModal(item, itemId) {
  const modal = document.getElementById("huge-detail-modal");
  const img = document.getElementById("huge-detail-img");
  const emoji = document.getElementById("huge-detail-emoji");
  const title = document.getElementById("huge-detail-title");
  const desc = document.getElementById("huge-detail-desc");
  const statsBox = document.getElementById("huge-detail-stats-box");
  const statsContent = document.getElementById("huge-detail-stats-content");
  
  if (!modal || !item) return;
  
  // 1. 이미지 혹은 에모지 설정
  if (item.image) {
    img.src = item.image;
    img.classList.remove("hidden");
    emoji.classList.add("hidden");
  } else {
    img.src = "";
    img.classList.add("hidden");
    emoji.textContent = item.icon;
    emoji.classList.remove("hidden");
  }
  
  // 2. 제목 및 설명
  title.textContent = item.name;
  desc.innerHTML = item.desc;
  
  // 3. 스탯
  const statMsg = getItemStatString(item, itemId);
  if (statMsg) {
    statsBox.classList.remove("hidden");
    statsContent.innerHTML = statMsg.replace(/ /g, "  ");
  } else {
    statsBox.classList.add("hidden");
  }
  
  modal.classList.remove("hidden");
}

function showHugeItemDetails(idx) {
  const itemId = state.inventory[idx];
  if (!itemId) return;
  const item = ITEM_DATABASE[itemId];
  openHugeDetailModal(item, itemId);
}

function showHugeEquipItemDetails(slot) {
  const slotType = slot.dataset.slot;
  let itemId = null;
  if (slotType === "journal") {
    const jIdx = parseInt(slot.dataset.idx);
    itemId = state.equipment.journals[jIdx];
  } else {
    itemId = state.equipment[slotType];
  }
  if (!itemId) return;
  const item = ITEM_DATABASE[itemId];
  openHugeDetailModal(item, itemId);
}

// 아이템 직접 사용/장착/해제
function useSelectedItem() {
  if (selectedEquipSlotType !== null) {
    if (selectedEquipSlotType === "journal") {
      unequipItem("journal", selectedEquipJournalIdx);
    } else {
      unequipItem(selectedEquipSlotType);
    }
    closeItemDetail();
    return;
  }

  if (selectedSlotIdx === null || selectedSlotIdx === undefined) return;
  const itemId = state.inventory[selectedSlotIdx];
  if (!itemId) return;
  const item = ITEM_DATABASE[itemId];
  
  if (item.usable) {
    if (removeAtInventory(selectedSlotIdx)) {
      // 효과 부여
      if (item.effect) {
        for (const [stat, value] of Object.entries(item.effect)) {
          const limit = (stat === "health") ? getPlayerMaxHealth() : 100;
          state[stat] = Math.min(limit, Math.max(0, state[stat] + value));
        }
      }
      
      showToast(`${item.name}을(를) 사용했습니다.`, "success");
      closeItemDetail();
      updateUI();
      saveGame();
    }
  } else if (item.equippable) {
    equipItem(selectedSlotIdx);
  }
}

// 제작(조합) 렌더링
function renderCrafting() {
  DOM.craftingList.innerHTML = "";
  
  for (const [recipeKey, recipe] of Object.entries(CRAFTING_RECIPES)) {
    const item = ITEM_DATABASE[recipeKey];
    const isUnlocked = recipe.locked === false || (state.unlockedRecipes && state.unlockedRecipes.includes(recipeKey));
    
    if (!isUnlocked) continue; // 해금되지 않았다면 렌더링하지 않음
    
    const craftItemDiv = document.createElement("div");
    craftItemDiv.className = "craft-item";
    
    // 비용 텍스트 구성
    let costText = "";
    let canCraft = true;
    
    const costEntries = Object.entries(recipe.cost);
    costEntries.forEach(([costId, reqQty], idx) => {
      const owned = hasItemQty(costId);
      const costItem = ITEM_DATABASE[costId];
      const hasEnough = owned >= reqQty;
      if (!hasEnough) canCraft = false;
      
      const qtyText = hasEnough 
        ? `${owned}/${reqQty}` 
        : `<span style="color: #e74c3c; font-weight: bold;">${owned}</span>/${reqQty}`;
      
      costText += `${getItemIconHtml(costItem, "1.1em")} ${costItem.name} ${qtyText}`;
      if (idx < costEntries.length - 1) costText += ", ";
    });
    
    craftItemDiv.innerHTML = `
      <div class="craft-info">
        <span class="craft-name">${getItemIconHtml(item, "1.2rem")} ${recipe.name}</span>
        <span class="craft-cost">${costText}</span>
      </div>
      <button class="btn btn-primary btn-craft" ${canCraft ? "" : "disabled"}>제작</button>
    `;
    
    const craftBtn = craftItemDiv.querySelector(".btn-craft");
    craftBtn.addEventListener("click", () => {
      craftItem(recipeKey, recipe);
    });
    
    DOM.craftingList.appendChild(craftItemDiv);
  }
}

// 아이템 조합 실행
function craftItem(recipeKey, recipe) {
  // 배낭 용량 확인 (제작 시 자원이 빠지므로 최종 개수 변화를 검사)
  // 소모되는 양
  let totalCostQty = Object.values(recipe.cost).reduce((a, b) => a + b, 0);
  // 제작된 양
  let resultQty = recipe.resultQty;
  let netQtyChange = resultQty - totalCostQty;
  
  if (getInventoryCount() + netQtyChange > state.maxInventory) {
    showToast("배낭에 공간이 부족하여 제작할 수 없습니다.", "error");
    return;
  }
  
  // 재료 실질적 소모
  for (const [costId, reqQty] of Object.entries(recipe.cost)) {
    removeFromInventory(costId, reqQty);
  }
  
  // 제작품 지급
  addToInventory(recipeKey, resultQty);
  showToast(`${recipe.name} 제작 성공!`, "success");
  
  updateUI();
  saveGame();
}

function getEventType(ev) {
  if (!ev) return "???";
  
  // 1. 전투
  if (ev.type === "combat" || (ev.id && parseInt(ev.id.replace("ev_", "")) >= 76 && parseInt(ev.id.replace("ev_", "")) <= 85)) {
    return "전투";
  }
  
  // 2. 생활일지 (길들이기 ev_86 ~ ev_91 및 마찰 발화 일지 획득 ev_70 등)
  const isTaming = ev.id && parseInt(ev.id.replace("ev_", "")) >= 86 && parseInt(ev.id.replace("ev_", "")) <= 91;
  let hasJournalInteraction = false;
  if (ev.options) {
    ev.options.forEach(opt => {
      if (opt.rewardItem && opt.rewardItem.id && opt.rewardItem.id.startsWith("journal_")) {
        hasJournalInteraction = true;
      }
      if (opt.tamePet) {
        hasJournalInteraction = true;
      }
    });
  }
  if (isTaming || hasJournalInteraction) {
    return "생활일지";
  }
  
  // 3. ??? (구조선 조우 ev_50)
  if (ev.id === "ev_50") {
    return "???";
  }
  
  // 4. 위험
  const hazardKeywords = ["눈보라", "동상", "식중독", "설맹", "돌풍", "눈사태", "함정", "화재", "독가스", "마비", "열병", "환각", "낙상"];
  const isHazard = hazardKeywords.some(kw => ev.title.includes(kw) || ev.description.includes(kw));
  let hasPenalty = false;
  if (ev.options) {
    ev.options.forEach(opt => {
      if (opt.effect) {
        if ((opt.effect.health && opt.effect.health < 0) || (opt.effect.sanity && opt.effect.sanity < -10)) {
          hasPenalty = true;
        }
      }
    });
  }
  if (isHazard || hasPenalty) {
    return "위험";
  }
  
  // 5. 파밍
  const farmingKeywords = ["획득", "자원", "파우치", "채집", "채굴", "수색", "보급", "발견", "장작", "더미", "사체", "잔해"];
  const isFarming = farmingKeywords.some(kw => ev.title.includes(kw) || ev.description.includes(kw));
  let hasItemReward = false;
  if (ev.options) {
    ev.options.forEach(opt => {
      if (opt.rewardItem) {
        hasItemReward = true;
      }
    });
  }
  if (isFarming || hasItemReward) {
    return "파밍";
  }
  
  // 6. 탐험
  return "탐험";
}

// 현재 이벤트 렌더링
function renderCurrentEvent() {
  const ev = state.currentEvent;
  if (ev && ev.id === "ev_merchant") {
    DOM.eventTitle.innerHTML = `<span class="event-type-badge" style="background:#f1c40f; color:#000;">상인</span>${ev.title}`;
    DOM.eventDesc.textContent = ev.description;
    DOM.eventOptions.innerHTML = "";
    
    // 1. 상점 거래소 열기 버튼
    const openBtn = document.createElement("button");
    openBtn.className = "btn btn-primary btn-option";
    openBtn.style.width = "100%";
    openBtn.style.fontWeight = "700";
    openBtn.innerHTML = "🤝 상점 거래소 열기";
    openBtn.addEventListener("click", () => {
      DOM.merchantSelectorModal.classList.remove("hidden");
      renderMerchantModal("buy");
    });
    DOM.eventOptions.appendChild(openBtn);
    
    // 2. 야영지로 복귀하여 정비 버튼
    const backBtn = document.createElement("button");
    backBtn.className = "btn btn-secondary btn-option";
    backBtn.style.width = "100%";
    backBtn.style.marginTop = "8px";
    backBtn.style.fontWeight = "700";
    backBtn.innerHTML = "⛺ 야영지로 복귀하여 정비";
    backBtn.addEventListener("click", () => {
      state.currentEvent = null;
      state.eventChosen = false;
      updateUI();
      saveGame();
    });
    DOM.eventOptions.appendChild(backBtn);
    
    // 3. 상인 보내기 버튼 (다음 날로 진행)
    const leaveBtn = document.createElement("button");
    leaveBtn.className = "btn btn-danger btn-option";
    leaveBtn.style.width = "100%";
    leaveBtn.style.marginTop = "8px";
    leaveBtn.style.fontWeight = "700";
    leaveBtn.innerHTML = "👋 상인을 떠나보낸다 (다음 날로 진행)";
    leaveBtn.addEventListener("click", () => {
      state.currentEvent = null;
      state.eventChosen = false;
      proceedToNextDay();
    });
    DOM.eventOptions.appendChild(leaveBtn);
    return;
  }

  if (!state.currentEvent) {
    // 이벤트가 진행 중이 아닐 때의 대기 레이아웃
    DOM.eventTitle.textContent = "안전한 야영지";
    
    // 장착한 생활 일지 행동들 확인
    const journalActions = getEquippedJournalActions();
    let desc = "아직까지 특별한 조짐은 보이지 않습니다. 일상 탐색이나 정비를 이어갈 수 있습니다.\n'주변 탐색' 또는 '안전 휴식' 행동을 선택하면 새로운 하루가 시작됩니다.";
    
    if (state.dayActionDone) {
      desc = "오늘의 주요 행동(탐색/휴식)을 마쳤습니다. 야영지에서 정비를 하거나 다음 날로 진행하십시오.\n(이벤트 결과를 마친 뒤 정비 단계를 수행 중입니다.)";
    }
    
    DOM.eventOptions.innerHTML = "";
    if (journalActions.length > 0) {
      desc += "\n\n━━━━━━━━━━━━━━━━━━━━━━\n장착된 생활 일지의 지식으로 아래의 특별 행동을 즉시 수행할 수 있습니다 (턴 소모 없음):";
      
      const journalActionConfig = {
        hunt: { text: "🪵 덫 놓기 (허기 -10, 나뭇가지 -1 소모 | 60% 확률로 생고기 수확)", action: "hunt" },
        cook: { text: "🥘 영양 스튜 요리 (생고기 1, 물 1, 약초 1 소모 | 스탯 대폭 회복)", action: "cook" },
        meditate: { text: "🧘 깊은 명상 (허기 -10, 체온 -10 소모 | 정신력 +40 회복)", action: "meditate" },
        engineer: { text: "🛠️ 바람막이 보강 (나뭇가지 1, 천 1 소모 | 3턴 간 체온 감소율 경감)", action: "engineer" },
        scout: { text: "🗺️ 효율적 정찰 (허기 -15, 체온 -15 소모 | 무작위 자원 2종 획득)", action: "scout" },
        tame: { text: "🍖 펫 훈련 (생고기 1 소모 | 모든 펫 능력치 영구 보강)", action: "tame" },
        think: { text: "🧠 생각하기 (정신력 -8, 허기 -5 소모 | 잠긴 제작 레시피 연구 해금)", action: "think" },
        friction: { text: "🪵 마찰로 불 피우기 (정신력 -10 소모 | 나뭇가지 1개 ➡️ 성냥 1개)", action: "friction" },
        attract: { text: "📢 소란 피우기 (정신력 -15 소모 | 즉시 70% 확률로 야생 괴수 전투 돌입)", action: "attract" }
      };
      
      journalActions.forEach(act => {
        const config = journalActionConfig[act];
        if (config) {
          const btn = document.createElement("button");
          btn.className = "btn btn-secondary btn-option";
          btn.style.marginBottom = "6px";
          btn.innerHTML = config.text;
          btn.addEventListener("click", () => {
            executeJournalAction(config.action);
          });
          DOM.eventOptions.appendChild(btn);
        }
      });
    }
    
    // 오늘 상인 방문일인데 정비 단계로 들어온 경우: 상점 재거래 버튼 노출
    if (state.day % 5 === 0) {
      desc += "\n\n━━━━━━━━━━━━━━━━━━━━━━\n극지 상인이 방문해 머물고 있습니다. 야영지 정비 중에도 언제든지 상점 거래소를 다시 열 수 있습니다.";
      const reMerchantBtn = document.createElement("button");
      reMerchantBtn.className = "btn btn-primary btn-option";
      reMerchantBtn.style.marginBottom = "8px";
      reMerchantBtn.style.fontWeight = "bold";
      reMerchantBtn.innerHTML = "🤝 극지 상점 거래소 다시 열기";
      reMerchantBtn.addEventListener("click", () => {
        DOM.merchantSelectorModal.classList.remove("hidden");
        renderMerchantModal("buy");
      });
      DOM.eventOptions.appendChild(reMerchantBtn);
    }
    
    // 이미 행동을 소모한 정비 단계라면 "다음 날로 진행" 버튼을 중앙에 노출한다.
    if (state.dayActionDone) {
      const nextDayBtn = document.createElement("button");
      nextDayBtn.className = "btn btn-primary btn-option";
      nextDayBtn.style.marginTop = "10px";
      nextDayBtn.style.fontWeight = "bold";
      nextDayBtn.style.background = "linear-gradient(135deg, var(--color-accent) 0%, #d35400 100%)";
      nextDayBtn.style.boxShadow = "0 4px 15px rgba(230, 126, 34, 0.3)";
      nextDayBtn.innerHTML = (state.day % 5 === 0) 
        ? "👋 상인을 배웅하고 다음 날로 진행" 
        : "🌙 밤 지새우기 (다음 날로 진행)";
      nextDayBtn.addEventListener("click", proceedToNextDay);
      DOM.eventOptions.appendChild(nextDayBtn);
    }
    
    DOM.eventDesc.textContent = desc;
    
    // 주변 탐색, 안전 휴식 버튼 상태 갱신
    if (state.dayActionDone) {
      DOM.actionForage.disabled = true;
      DOM.actionRest.disabled = true;
    } else {
      DOM.actionForage.disabled = false;
      DOM.actionRest.disabled = false;
    }
    return;
  }
  
  // 전투 이벤트 즉각 돌입 차단하고 인과 설명을 먼저 띄우도록 가로채기 로직을 하단 eventOptions 분기로 이전
  const evType = getEventType(ev);
  let badgeColor = "var(--color-primary)";
  if (evType === "전투") badgeColor = "var(--color-danger)";
  else if (evType === "위험") badgeColor = "#e74c3c";
  else if (evType === "파밍") badgeColor = "#2ece72";
  else if (evType === "탐험") badgeColor = "#3498db";
  else if (evType === "생활일지") badgeColor = "#9b59b6";
  else if (evType === "???") badgeColor = "#f1c40f";
  
  DOM.eventTitle.innerHTML = `<span class="event-type-badge" style="background:${badgeColor}; color:#fff;">${evType}</span>${ev.title}`;
  
  if (state.eventChosen) {
    // 선택 완료 후 결과 화면
    DOM.eventDesc.textContent = ev.description + "\n\n━━━━━━━━━━━━━━━━━━━━━━\n\n결과: " + ev.chosenResultText;
    
    DOM.eventOptions.innerHTML = "";
    
    // 1. 야영지(휴식처)로 돌아가기 버튼
    const backBtn = document.createElement("button");
    backBtn.className = "btn btn-secondary btn-option";
    backBtn.style.width = "100%";
    backBtn.style.fontWeight = "700";
    backBtn.innerHTML = "⛺ 야영지로 복귀하여 정비 (일지 사용)";
    backBtn.addEventListener("click", () => {
      state.currentEvent = null;
      state.eventChosen = false;
      updateUI();
      saveGame();
    });
    DOM.eventOptions.appendChild(backBtn);
    
    // 2. 즉시 다음 날로 진행 버튼
    const nextBtn = document.createElement("button");
    nextBtn.className = "btn btn-primary btn-option";
    nextBtn.style.width = "100%";
    nextBtn.style.marginTop = "8px";
    nextBtn.style.fontWeight = "700";
    nextBtn.innerHTML = "🌙 다음 날로 진행 (즉시 밤 지새우기)";
    nextBtn.addEventListener("click", proceedToNextDay);
    DOM.eventOptions.appendChild(nextBtn);
  } else {
    // 선택 대기 화면
    DOM.eventDesc.textContent = ev.description;
    DOM.eventOptions.innerHTML = "";
    
    if (ev.id === "ev_ruins_explore") {
      let hasAnyOffering = false;
      Object.keys(RUINS_OFFERING_MAP).forEach(itemId => {
        const hasQty = state.inventory.filter(id => id === itemId).length;
        if (hasQty > 0) {
          hasAnyOffering = true;
          const mapData = RUINS_OFFERING_MAP[itemId];
          const rewardsDesc = mapData.rewards.map(r => `${getItemIconHtml(ITEM_DATABASE[r], "1em")} ${ITEM_DATABASE[r].name}`).join(" + ");
          const optBtn = document.createElement("button");
          optBtn.className = "btn-option";
          optBtn.innerHTML = `${getItemIconHtml(ITEM_DATABASE[itemId], "1.1em")} ${mapData.name} 1개를 제단에 바친다 ➔ (보상: ${rewardsDesc} 지급)`;
          optBtn.addEventListener("click", () => {
            offeringRuins(itemId);
          });
          DOM.eventOptions.appendChild(optBtn);
        }
      });
      
      const leaveBtn = document.createElement("button");
      leaveBtn.className = "btn-option";
      leaveBtn.innerHTML = "🏛️ 아무것도 바치지 않고 떠난다";
      leaveBtn.addEventListener("click", () => {
        state.currentEvent.chosenResultText = "유적의 신비로운 냉기만을 느낀 채 조용히 야영지로 복귀했습니다.";
        state.eventChosen = true;
        updateUI();
        saveGame();
      });
      DOM.eventOptions.appendChild(leaveBtn);
      
      if (!hasAnyOffering) {
        DOM.eventDesc.textContent = ev.description + "\n\n(※ 현재 제단에 바칠 만한 유효한 재료가 가방에 전혀 없습니다.)";
      }
    } else if (ev.type === "combat") {
      // 전투 조우 이벤트의 인과를 띄운 상태에서 전투를 시작할 수 있게 버튼 노출
      const combatBtn = document.createElement("button");
      combatBtn.className = "btn btn-danger btn-option";
      combatBtn.style.textAlign = "center";
      combatBtn.style.fontWeight = "bold";
      combatBtn.innerHTML = "⚔️ 전투 시작 (맞서 싸운다)";
      combatBtn.addEventListener("click", () => {
        state.eventChosen = true;
        triggerCombat(ev.monster);
      });
      DOM.eventOptions.appendChild(combatBtn);
    } else {
      // 플레이어가 만족할 수 있는 선택지가 존재하는지 체크
      let hasValidOption = false;
      ev.options.forEach(opt => {
        let satisfies = true;
        if (opt.requiredItem) {
          const has = hasItemQty(opt.requiredItem);
          if (has <= 0) satisfies = false;
        }
        if (satisfies) hasValidOption = true;
      });
      
      // 유효한 선택지가 하나도 없다면, 우회용 비상 선택지(4번째 선택지)를 일시 추가
      const optionsToRender = [...ev.options];
      if (!hasValidOption) {
        optionsToRender.push({
          text: "🚨 아무런 수단이 없어 맨몸으로 혹독하게 버틴다 (체력 -50, 체온 -25, 포만감 -30, 정신력 -75)",
          effect: { health: -50, warmth: -25, hunger: -30, sanity: -75 },
          resultText: "어떠한 대비책도 마련하지 못해 극한의 한기와 통증이 전신을 마비시킵니다. 정신을 잃고 쓰러지기 일보직전입니다."
        });
      }
      
      optionsToRender.forEach((opt, idx) => {
        const optBtn = document.createElement("button");
        optBtn.className = "btn-option";
        
        // 조건 검증
        let satisfies = true;
        let reqMsg = "";
        if (opt.requiredItem) {
          const reqItem = ITEM_DATABASE[opt.requiredItem];
          const has = hasItemQty(opt.requiredItem);
          if (has <= 0) {
            satisfies = false;
            reqMsg = ` [필요: ${getItemIconHtml(reqItem, "1em")} ${reqItem.name}]`;
          } else {
            reqMsg = ` [소유함: ${getItemIconHtml(reqItem, "1em")} ${reqItem.name}${opt.consumeItem ? " - 소모됨" : ""}]`;
          }
        }
        
        optBtn.innerHTML = opt.text + (reqMsg ? `<span style="display:block;font-size:0.75rem;color:${satisfies ? '#3498db':'#e74c3c'}">${reqMsg}</span>` : "");
        optBtn.disabled = !satisfies;
        
        optBtn.addEventListener("click", () => {
          if (!hasValidOption && idx === optionsToRender.length - 1) {
            chooseBypassOption(opt);
          } else {
            chooseEventOption(idx);
          }
        });
        
        DOM.eventOptions.appendChild(optBtn);
      });
    }
  }
}

// 행동: 주변 탐색
function forageAction() {
  if (state.currentEvent && !state.eventChosen) return;
  state.dayActionDone = true; // 오늘 행동 완료로 마킹
  
  // 탐색 소모 코스트
  const warmthCost = 15;
  const hungerCost = 15;
  const sanityCost = 5;
  
  state.warmth = Math.max(0, state.warmth - warmthCost);
  state.hunger = Math.max(0, state.hunger - hungerCost);
  state.sanity = Math.max(0, state.sanity - sanityCost);
  
  // 아이템 탐색 드롭 풀 구성
  const dropPool = [
    { id: "wood", weight: 45 }, // 가중치 30 -> 45 상향
    { id: "snow", weight: 25 },
    { id: "raw_meat", weight: 12 },
    { id: "metal", weight: 15 },
    { id: "herb", weight: 10 },
    { id: "cloth", weight: 8 }
  ];
  
  // 가중치 비례 아이템 추첨
  const totalWeight = dropPool.reduce((acc, item) => acc + item.weight, 0);
  
  // 1개에서 3개 아이템 획득 시도
  let itemsFoundCount = Math.floor(Math.random() * 3) + 1;
  let itemsAcquiredMsg = [];
  
  for (let i = 0; i < itemsFoundCount; i++) {
    let rand = Math.random() * totalWeight;
    let selectedId = "wood";
    for (const item of dropPool) {
      rand -= item.weight;
      if (rand <= 0) {
        selectedId = item.id;
        break;
      }
    }
    
    const success = addToInventory(selectedId, 1);
    if (success) {
      itemsAcquiredMsg.push(ITEM_DATABASE[selectedId].name);
    }
  }
  
  if (itemsAcquiredMsg.length > 0) {
    showToast(`탐색을 마쳐 [${itemsAcquiredMsg.join(", ")}]을(를) 획득했습니다.`, "success");
  } else {
    showToast("주변에서 쓸만한 물건을 찾지 못했습니다.", "info");
  }
  
  // 턴 전환 후 20% 확률로 유적지 이벤트, 그 외에는 무작위 이벤트 트리거
  if (Math.random() < 0.2) {
    state.eventChosen = false;
    state.currentEvent = JSON.parse(JSON.stringify(RUINS_EVENT_DATA));
    showToast("🏛️ 고대 극지 유적지에 도달했습니다!", "success");
    updateUI();
    saveGame();
  } else {
    triggerRandomEvent();
  }
}

// 행동: 안전 휴식
function restAction() {
  if (state.currentEvent && !state.eventChosen) return;
  state.dayActionDone = true; // 오늘 행동 완료로 마킹
  
  // 텐트 보유에 따른 보너스 처리
  const hasTent = hasItemQty("tent") > 0;
  
  let healthRecovery = hasTent ? 18 : 5;
  let warmthRecovery = hasTent ? 15 : 5;
  let sanityRecovery = hasTent ? 20 : 8;
  let hungerLoss = 8; // 휴식 중 소모 포만감
  
  state.health = Math.min(100, state.health + healthRecovery);
  state.warmth = Math.min(100, state.warmth + warmthRecovery);
  state.sanity = Math.min(100, state.sanity + sanityRecovery);
  state.hunger = Math.max(0, state.hunger - hungerLoss);
  
  if (hasTent) {
    showToast("조립된 텐트에서 기력을 아주 아늑하게 회복했습니다.", "success");
  } else {
    showToast("허허벌판에서 웅크린 채 불안한 휴식을 취했습니다.", "info");
  }
  
  // 턴 전환 후 무작위 이벤트 트리거
  triggerRandomEvent();
}

// 무작위 이벤트 트리거
function triggerRandomEvent() {
  state.eventChosen = false;
  
  let selectedEvent = null;
  
  // 연쇄 시나리오 확률 개입 (50% 확률로 다음 연쇄 스토리 강제 실행)
  if (state.activeChainEventId && Math.random() < 0.5) {
    const chainEvent = window.survivalEvents.find(ev => ev.id === state.activeChainEventId);
    if (chainEvent) {
      selectedEvent = chainEvent;
      showToast("📜 이전 스토리와 연결되는 상황이 발생했습니다!", "info");
      state.activeChainEventId = null; // 발생했으므로 정상 복귀
    }
  }
  
  const isAttracting = state.equipment.journals && state.equipment.journals.includes("journal_attraction");
  
  if (!selectedEvent && state.day >= 12 && Math.random() < 0.25) {
    // 12일차 이후 구조선 발견 이벤트 확률 대폭 개입
    selectedEvent = window.survivalEvents.find(ev => ev.id === "ev_50");
  }
  
  if (!selectedEvent) {
    // 이목 유도 일지를 장착했다면 15%의 확률로 전투 강제 선별
    if (isAttracting && Math.random() < 0.15) {
      const combatEvents = window.survivalEvents.filter(ev => ev.type === "combat" || (ev.id && parseInt(ev.id.replace("ev_", "")) >= 76 && parseInt(ev.id.replace("ev_", "")) <= 85));
      selectedEvent = combatEvents[Math.floor(Math.random() * combatEvents.length)];
      showToast("📢 이목 유도 일지의 효과로 괴수가 유인되었습니다!", "error");
    }
  }
  
  if (!selectedEvent) {
    // 그 외에는 1~49번 및 연쇄 시작 스토리 중에서 무작위 추첨
    let normalEvents = window.survivalEvents.filter(ev => {
      if (ev.id === "ev_50") return false;
      // 연쇄 스토리 중 시작 스토리(끝자리가 _1)가 아닌 중간/끝 스토리들은 무작위 풀에서 배제
      if (ev.id.startsWith("ev_chain_") && !ev.id.endsWith("_1")) return false;
      return true;
    });
    if (state.day < 20) {
      // 20일 이전에는 너무 강한 적(예티, 북극곰, 경비로봇) 배제
      normalEvents = normalEvents.filter(ev => ev.id !== "ev_82" && ev.id !== "ev_83" && ev.id !== "ev_84");
    }
    const randIdx = Math.floor(Math.random() * normalEvents.length);
    selectedEvent = normalEvents[randIdx];
  }
  
  // 깊은 복사를 통해 원래 배열 데이터 훼손 방지
  state.currentEvent = JSON.parse(JSON.stringify(selectedEvent));
  
  updateUI();
  saveGame();
}

// 비상 우회 선택지 실행
function chooseBypassOption(opt) {
  if (!state.currentEvent || state.eventChosen) return;
  
  // 플레이어 스탯 변화 적용 (패널티 차감)
  if (opt.effect) {
    for (const [stat, val] of Object.entries(opt.effect)) {
      state[stat] = Math.min(100, Math.max(0, state[stat] + val));
    }
  }
  
  if (opt.nextChainEventId) {
    state.activeChainEventId = opt.nextChainEventId;
  }
  
  state.eventChosen = true;
  state.currentEvent.chosenResultText = opt.resultText;
  
  updateUI();
  saveGame();
}

// 이벤트 선택지 선택 실행
function chooseEventOption(optIdx) {
  if (!state.currentEvent || state.eventChosen) return;
  
  const opt = state.currentEvent.options[optIdx];
  
  // 요구사항 차감 처리
  if (opt.requiredItem && opt.consumeItem) {
    removeFromInventory(opt.requiredItem, 1);
  }
  
  // 플레이어 스탯 변화 적용
  if (opt.effect) {
    for (const [stat, val] of Object.entries(opt.effect)) {
      state[stat] = Math.min(100, Math.max(0, state[stat] + val));
    }
  }
  
  if (opt.nextChainEventId) {
    state.activeChainEventId = opt.nextChainEventId;
  }
  
  // 아이템 보상 지급
  if (opt.rewardItem) {
    addToInventory(opt.rewardItem.id, opt.rewardItem.qty);
  }
  if (opt.rewardItems && Array.isArray(opt.rewardItems)) {
    opt.rewardItems.forEach(item => {
      addToInventory(item.id, item.qty);
    });
  }
  
  // 펫 길들이기 수행
  if (opt.tamePet) {
    tamePet(opt.tamePet.id, opt.tamePet.name);
  }
  
  // 승리 조건 검증
  if (opt.triggerEscape) {
    triggerVictory(opt.resultText);
    return;
  }
  
  state.eventChosen = true;
  state.currentEvent.chosenResultText = opt.resultText;
  
  updateUI();
  saveGame();
}

// 하루가 흐르는 내부 턴 연산
function proceedToNextDay() {
  state.day++;
  state.dayActionDone = false; // 하루 행동 완료 리셋
  
  // 방한 의복 스탯 계산
  const warmthBonus = getPlayerWarmthRetention();
  
  // 매 턴 기본 소모 수치 (기본 10에서 의복 보온성 보너스 차감, 최소 2)
  const baseWarmthLoss = Math.max(2, 10 - warmthBonus);
  // 체온이 20이하일 때만 포만감 소모 12 (그 외에는 소모 0)
  const baseHungerLoss = (state.warmth <= 20) ? 12 : 0;
  const baseSanityLoss = 5;
  
  // 일지: 정비 공학 버프 연산
  let shieldRate = 1.0;
  if (state.windShieldTurns && state.windShieldTurns > 0) {
    shieldRate = 0.7; // 30% 경감
    state.windShieldTurns--;
    showToast(`단열 바람막이 보강의 효과로 추위가 경감됩니다. (남은 턴: ${state.windShieldTurns}턴)`, "info");
  }

  state.warmth = Math.max(0, state.warmth - Math.round(baseWarmthLoss * shieldRate));
  state.hunger = Math.max(0, state.hunger - baseHungerLoss);
  state.sanity = Math.max(0, state.sanity - baseSanityLoss);
  
  // 이상 상태(0)에 따른 추가 체력 피해 연산
  let extraDamage = 0;
  let damageReasons = [];
  
  if (state.warmth <= 0) {
    extraDamage += 15;
    damageReasons.push("동상");
  }
  if (state.hunger <= 0) {
    extraDamage += 10;
    damageReasons.push("굶주림");
  }
  if (state.sanity <= 0) {
    extraDamage += 5;
    damageReasons.push("정신 붕괴");
  }
  
  if (extraDamage > 0) {
    state.health = Math.max(0, state.health - extraDamage);
    showToast(`${damageReasons.join(" 및 ")}으로 체력이 ${extraDamage} 감소했습니다!`, "error");
  }
  
  // 사망(게임오버) 판정
  if (state.health <= 0) {
    triggerGameOver();
    return;
  }
  
  // 대기 이벤트 클리어 후 UI 갱신
  state.eventChosen = false;
  
  if (state.day % 5 === 0) {
    state.sanity = Math.min(100, state.sanity + 5);
    state.currentEvent = generateMerchantEvent();
    state.dayActionDone = true; // 상인이 온 날은 탐색/휴식을 스킵하고 정비 단계로 설정
    showToast("🤝 극지 상인이 방문했습니다! (정신력 +5)", "success");
    setTimeout(() => {
      if (DOM.merchantSelectorModal) {
        DOM.merchantSelectorModal.classList.remove("hidden");
        renderMerchantModal("buy");
      }
    }, 1500);
  } else {
    state.currentEvent = null;
    triggerRandomEvent();
  }
  
  showToast(`새로운 ${state.day}일차가 시작되었습니다.`, "info");
  updateUI();
  saveGame();
}

// 게임 오버
function triggerGameOver() {
  state.gameOver = true;
  saveGame();
  
  DOM.gameScreen.classList.remove("active");
  DOM.combatScreen.classList.remove("active");
  DOM.endScreen.classList.add("active");
  if (DOM.discardSelectorModal) {
    DOM.discardSelectorModal.classList.add("hidden");
  }
  
  DOM.endTitle.textContent = "생존 실패";
  DOM.endTitle.style.color = "var(--color-danger)";
  
  let reason = "체력이 바닥나 혹독한 극지에서 쓸쓸히 영면에 들었습니다.";
  if (state.warmth <= 0) reason = "저체온증으로 신체 기능이 마비된 채 굳어버렸습니다.";
  else if (state.hunger <= 0) reason = "먹을 것을 구하지 못한 채 심각한 아사 상태에 이르렀습니다.";
  else if (state.sanity <= 0) reason = "밀려오는 고립감과 환각 속에 스스로 어둠 속으로 걸어 들어갔습니다.";
  
  DOM.endReason.textContent = reason;
  DOM.endDays.textContent = `${state.day} Days Survived`;
}

// 승리 (클리어)
function triggerVictory(victoryText) {
  state.gameOver = true;
  saveGame();
  
  DOM.gameScreen.classList.remove("active");
  DOM.combatScreen.classList.remove("active");
  DOM.endScreen.classList.add("active");
  if (DOM.discardSelectorModal) {
    DOM.discardSelectorModal.classList.add("hidden");
  }
  
  DOM.endTitle.textContent = "생존 탈출 성공!";
  DOM.endTitle.style.color = "#2ecc71"; // 그린 컬러
  
  DOM.endReason.innerHTML = `${victoryText}<br><br>가혹한 추위를 이겨내고 구조대에 의해 기적적으로 살아서 문명 세계로 복귀했습니다!`;
  DOM.endDays.textContent = `총 ${state.day}일 동안 생존 완료`;
}

// ==========================================
// 확장팩 추가 시스템 구현부
// ==========================================

// 1. 도안 연구 (생각하기)
function researchRecipe(recipeKey) {
  if (state.sanity < 8 || state.hunger < 5) {
    showToast("정신력(최소 8)이나 허기(최소 5)가 부족하여 깊은 생각에 잠길 수 없습니다.", "error");
    return;
  }
  
  state.sanity = Math.max(0, state.sanity - 8);
  state.hunger = Math.max(0, state.hunger - 5);
  
  if (!state.unlockedRecipes) state.unlockedRecipes = [];
  state.unlockedRecipes.push(recipeKey);
  discoverRecipe(recipeKey); // 도감 발견 처리
  
  localStorage.setItem("frostbite_unlocked_recipes", JSON.stringify(state.unlockedRecipes));
  
  showToast(`${ITEM_DATABASE[recipeKey].name} 제작법을 영구적으로 해금했습니다!`, "success");
  updateUI();
  saveGame();
}

// 2. 장비 장착 / 해제 로직
function getPlayerDefense() {
  let def = 0;
  if (state.equipment.head) def += ITEM_DATABASE[state.equipment.head].stats.defense || 0;
  if (state.equipment.body) def += ITEM_DATABASE[state.equipment.body].stats.defense || 0;
  if (state.equipment.legs) def += ITEM_DATABASE[state.equipment.legs].stats.defense || 0;
  if (state.equipment.feet) def += ITEM_DATABASE[state.equipment.feet].stats.defense || 0;
  if (state.equipment.bag) def += ITEM_DATABASE[state.equipment.bag].stats.defense || 0;
  return def;
}

function getPlayerWarmthRetention() {
  let wr = 0;
  if (state.equipment.head) wr += ITEM_DATABASE[state.equipment.head].stats.warmth_retention || 0;
  if (state.equipment.body) wr += ITEM_DATABASE[state.equipment.body].stats.warmth_retention || 0;
  if (state.equipment.legs) wr += ITEM_DATABASE[state.equipment.legs].stats.warmth_retention || 0;
  if (state.equipment.feet) wr += ITEM_DATABASE[state.equipment.feet].stats.warmth_retention || 0;
  if (state.equipment.bag) wr += ITEM_DATABASE[state.equipment.bag].stats.warmth_retention || 0;
  return wr;
}

function getPlayerMaxHealth() {
  let hpBonus = 0;
  if (state.equipment.head) hpBonus += ITEM_DATABASE[state.equipment.head].stats.health || 0;
  if (state.equipment.body) hpBonus += ITEM_DATABASE[state.equipment.body].stats.health || 0;
  if (state.equipment.legs) hpBonus += ITEM_DATABASE[state.equipment.legs].stats.health || 0;
  if (state.equipment.feet) hpBonus += ITEM_DATABASE[state.equipment.feet].stats.health || 0;
  if (state.equipment.bag) hpBonus += ITEM_DATABASE[state.equipment.bag].stats.health || 0;
  return 100 + hpBonus;
}

function equipItem(invIdx) {
  const itemId = state.inventory[invIdx];
  if (!itemId) return;
  const item = ITEM_DATABASE[itemId];
  if (!item.equippable) return;
  
  const slot = item.slot;
  
  // 인벤토리에서 먼저 빼기
  state.inventory.splice(invIdx, 1);
  
  if (slot === "journal") {
    // 일지는 장착 가방 버프에 따라 최대 4칸까지 빈 칸 탐색 장착
    const maxSlots = (state.equipment.bag === "bag_academic") ? 4 : 3;
    let equippedIdx = -1;
    for (let i = 0; i < maxSlots; i++) {
      if (state.equipment.journals[i] === null) {
        state.equipment.journals[i] = itemId;
        equippedIdx = i;
        break;
      }
    }
    // 빈 칸이 없으면 0번 교체 해제
    if (equippedIdx === -1) {
      unequipItem("journal", 0, true);
      state.equipment.journals[0] = itemId;
    }
  } else {
    // 일반 부위 장착
    if (state.equipment[slot] !== null) {
      // 이미 장착된 녀석은 강제 해제해서 가방으로 돌려보냄
      const prevItem = state.equipment[slot];
      state.inventory.push(prevItem);
    }
    state.equipment[slot] = itemId;
    
    // 가방 장착 시 용량 즉각 갱신
    if (slot === "bag") {
      state.maxInventory = item.stats.max_inv || 15;
    }
  }
  
  showToast(`${item.name}을(를) 장착했습니다.`, "success");
  selectedSlotIdx = null;
  closeItemDetail();
  updateUI();
  saveGame();
}

function unequipItem(slotType, journalIdx = null, force = false) {
  if (slotType === "journal" && !force) {
    showToast("생활일지는 장착하면 해제할 수 없습니다!", "error");
    return;
  }
  
  let itemId = null;
  if (slotType === "journal") {
    itemId = state.equipment.journals[journalIdx];
  } else {
    itemId = state.equipment[slotType];
  }
  
  if (!itemId) return;
  const item = ITEM_DATABASE[itemId];
  
  // 가방 용량 제한 검증 (가방 해제 시 최대 크기가 15로 감소하므로 현재 짐 개수가 15 이하여야 해제 가능)
  let targetMax = state.maxInventory;
  if (slotType === "bag") {
    targetMax = 15; // 해제 후 기본 크기
    if (getInventoryCount() >= targetMax) {
      showToast(`가방 안에 아이템이 너무 많아 해제할 수 없습니다. (보관 개수를 ${targetMax - 1}개 이하로 줄이십시오)`, "error");
      return;
    }
  } else {
    // 일반 아이템은 해제 시 가방 1칸을 소모하므로 현재 꽉 차있으면 해제 불가
    if (getInventoryCount() + 1 > state.maxInventory) {
      showToast("배낭에 공간이 부족하여 장비를 해제할 수 없습니다.", "error");
      return;
    }
  }
  
  // 해제 처리
  state.inventory.push(itemId);
  if (slotType === "journal") {
    state.equipment.journals[journalIdx] = null;
  } else {
    state.equipment[slotType] = null;
    if (slotType === "bag") {
      state.maxInventory = 15;
    }
  }
  
  state.health = Math.min(state.health, getPlayerMaxHealth());
  showToast(`${item.name}의 장착을 해제했습니다.`, "info");
  updateUI();
  saveGame();
}

function renderEquipment() {
  const slotsConfig = [
    { el: document.getElementById("equip-head"), val: state.equipment.head, defaultIcon: "🪖", defaultName: "머리" },
    { el: document.getElementById("equip-body"), val: state.equipment.body, defaultIcon: "🧥", defaultName: "몸" },
    { el: document.getElementById("equip-legs"), val: state.equipment.legs, defaultIcon: "👖", defaultName: "다리" },
    { el: document.getElementById("equip-feet"), val: state.equipment.feet, defaultIcon: "🥾", defaultName: "신발" },
    { el: document.getElementById("equip-bag"), val: state.equipment.bag, defaultIcon: "🎒", defaultName: "가방" }
  ];
  
  slotsConfig.forEach(cfg => {
    // 이전 배지 제거
    const oldBadge = cfg.el.querySelector(".item-badge");
    if (oldBadge) oldBadge.remove();
    
    if (cfg.val) {
      const item = ITEM_DATABASE[cfg.val];
      cfg.el.classList.add("equipped");
      cfg.el.querySelector(".equip-slot-icon").innerHTML = getItemIconHtml(item, "2.2rem");
      cfg.el.querySelector(".equip-slot-name").textContent = item.name;
      
      // 배지 추가
      const badgeClass = BADGE_CLASS_MAP[item.type] || "badge-material";
      const badgeEl = document.createElement("span");
      badgeEl.className = `item-badge ${badgeClass}`;
      badgeEl.textContent = item.type;
      cfg.el.appendChild(badgeEl);
      
      // 툴팁 세팅
      const statMsg = getItemStatString(item, cfg.val);
      cfg.el.title = `${item.name}\n${item.desc}${statMsg ? '\n[스탯: ' + statMsg + ']' : ''}`;
    } else {
      cfg.el.classList.remove("equipped");
      cfg.el.querySelector(".equip-slot-icon").textContent = cfg.defaultIcon;
      cfg.el.querySelector(".equip-slot-name").textContent = cfg.defaultName;
      cfg.el.removeAttribute("title");
    }
  });
  
  // 학자 가방 여부에 따른 4번째 일지창 슬롯 토글
  const hasAcademicBag = state.equipment.bag === "bag_academic";
  const journal3El = document.getElementById("equip-journal-3");
  if (hasAcademicBag) {
    journal3El.classList.remove("hidden");
  } else {
    // 가방이 해제되어 슬롯이 닫힐 때 장착되어 있던 4번째 일지는 인벤토리로 해제 처리
    if (state.equipment.journals && state.equipment.journals.length > 3 && state.equipment.journals[3] !== null) {
      unequipItem("journal", 3, true);
    }
    journal3El.classList.add("hidden");
  }
  
  // 일지 슬롯 동적 렌더링
  for (let i = 0; i < 4; i++) {
    const el = document.getElementById(`equip-journal-${i}`);
    if (!el) continue;
    
    // 이전 배지 제거
    const oldBadge = el.querySelector(".item-badge");
    if (oldBadge) oldBadge.remove();
    
    // journals 배열 크기가 i보다 작거나 값 자체가 null인 경우 대비
    const val = (state.equipment.journals && state.equipment.journals.length > i) ? state.equipment.journals[i] : null;
    if (val) {
      const item = ITEM_DATABASE[val];
      el.classList.add("equipped");
      el.querySelector(".equip-slot-icon").innerHTML = getItemIconHtml(item, "2.2rem");
      el.querySelector(".equip-slot-name").textContent = item.name;
      
      // 배지 추가
      const badgeClass = BADGE_CLASS_MAP[item.type] || "badge-material";
      const badgeEl = document.createElement("span");
      badgeEl.className = `item-badge ${badgeClass}`;
      badgeEl.textContent = item.type;
      el.appendChild(badgeEl);
      
      // 툴팁 세팅
      const statMsg = getItemStatString(item, val);
      el.title = `${item.name}\n${item.desc}${statMsg ? '\n[스탯: ' + statMsg + ']' : ''}`;
    } else {
      el.classList.remove("equipped");
      el.querySelector(".equip-slot-icon").textContent = "📖";
      el.querySelector(".equip-slot-name").textContent = `일지${i+1}`;
      el.removeAttribute("title");
    }
  }
}

// 3. 일지 특수 기지 행동 렌더링 및 실행
function getEquippedJournalActions() {
  const actions = [];
  state.equipment.journals.forEach(itemId => {
    if (itemId) {
      actions.push(ITEM_DATABASE[itemId].stats.action);
    }
  });
  return actions;
}

function executeJournalAction(actionType) {
  if (actionType === "hunt") {
    // 덫 놓기
    if (state.hunger < 10 || !removeFromInventory("wood", 1)) {
      showToast("배고픔(최소 10)이 부족하거나 장작(1개)이 필요합니다.", "error");
      return;
    }
    state.hunger = Math.max(0, state.hunger - 10);
    const success = Math.random() < 0.6;
    if (success) {
      const qty = Math.floor(Math.random() * 2) + 1;
      addToInventory("raw_meat", qty);
      showToast(`덫으로 생고기 ${qty}개를 수확했습니다!`, "success");
    } else {
      showToast("덫이 손상되었고 사냥에 실패했습니다.", "info");
    }
  }
  else if (actionType === "cook") {
    // 영양 스튜 만들기
    if (!hasItemQty("raw_meat") || !hasItemQty("water") || !hasItemQty("herb")) {
      showToast("재료가 부족합니다. (생고기 1, 깨끗한 물 1, 약초 1 필요)", "error");
      return;
    }
    removeFromInventory("raw_meat", 1);
    removeFromInventory("water", 1);
    removeFromInventory("herb", 1);
    
    state.health = Math.min(100, state.health + 20);
    state.hunger = Math.min(100, state.hunger + 50);
    state.sanity = Math.min(100, state.sanity + 10);
    showToast("영양 스튜를 요리해 먹고 큰 활력을 회복했습니다!", "success");
  }
  else if (actionType === "meditate") {
    // 명상
    if (state.hunger < 10 || state.warmth < 10) {
      showToast("허기(최소 10)나 체온(최소 10)이 너무 낮아 명상에 집중할 수 없습니다.", "error");
      return;
    }
    state.hunger = Math.max(0, state.hunger - 10);
    state.warmth = Math.max(0, state.warmth - 10);
    state.sanity = Math.min(100, state.sanity + 40);
    showToast("조용히 명상하며 고독한 혼란과 어두운 고통을 극복했습니다. (정신력 +40)", "success");
  }
  else if (actionType === "engineer") {
    // 바람막이 보강
    if (!hasItemQty("wood") || !hasItemQty("cloth")) {
      showToast("재료가 부족합니다. (장작 1, 천 1 필요)", "error");
      return;
    }
    removeFromInventory("wood", 1);
    removeFromInventory("cloth", 1);
    state.windShieldTurns = 3;
    showToast("기지 벽면의 찬 바람 차단막을 3턴 간 강화했습니다. (체온 감소 경감)", "success");
  }
  else if (actionType === "scout") {
    // 루트 정찰
    if (state.hunger < 15 || state.warmth < 15) {
      showToast("스탯이 너무 부족합니다. (허기 15, 체온 15 필요)", "error");
      return;
    }
    state.hunger = Math.max(0, state.hunger - 15);
    state.warmth = Math.max(0, state.warmth - 15);
    
    // 이로운 무작위 자원 채취
    const rewards = ["wire", "flint", "coal", "feather", "tendon", "scrap_circuit", "herb", "metal"];
    const got1 = rewards[Math.floor(Math.random() * rewards.length)];
    const got2 = rewards[Math.floor(Math.random() * rewards.length)];
    addToInventory(got1, 1);
    addToInventory(got2, 1);
    showToast(`성공적으로 지형을 개척하여 자원 2종을 가져왔습니다.`, "success");
  }
  else if (actionType === "tame") {
    // 펫 훈련
    if (state.pets.length === 0) {
      showToast("동료 펫이 전혀 없어 조련할 대상이 없습니다.", "error");
      return;
    }
    if (!removeFromInventory("raw_meat", 1)) {
      showToast("훈련에 필요한 생고기(1개)가 없습니다.", "error");
      return;
    }
    
    state.pets.forEach(pet => {
      pet.maxHp += 5;
      pet.hp += 5;
      pet.atk += 2;
    });
    showToast("먹이 훈련을 통해 모든 펫의 전투 능력을 영구 보강했습니다!", "success");
  }
  else if (actionType === "think") {
    showResearchSelector();
  }
  else if (actionType === "friction") {
    if (state.sanity < 10) {
      showToast("정신력(최소 10)이 부족하여 나무를 비벼 불을 피울 집중력이 없습니다.", "error");
      return;
    }
    if (hasItemQty("wood") < 1) {
      showToast("재료가 부족합니다. (나뭇가지 1개 필요)", "error");
      return;
    }
    
    removeFromInventory("wood", 1);
    addToInventory("matches", 1);
    state.sanity = Math.max(0, state.sanity - 10);
    showToast("나무를 빠르게 마찰하여 성냥(불씨) 1개를 얻었습니다!", "success");
  }
  else if (actionType === "attract") {
    if (state.sanity < 15) {
      showToast("정신력(최소 15)이 부족하여 소란을 피울 힘이 없습니다.", "error");
      return;
    }
    state.sanity = Math.max(0, state.sanity - 15);
    showToast("📢 큰 소리를 지르며 주변 생명체들의 이목을 끕니다...", "info");
    
    if (Math.random() < 0.7) {
      const combatEvents = window.survivalEvents.filter(ev => ev.type === "combat" || (ev.id && parseInt(ev.id.replace("ev_", "")) >= 76 && parseInt(ev.id.replace("ev_", "")) <= 85));
      const rand = combatEvents[Math.floor(Math.random() * combatEvents.length)];
      state.currentEvent = JSON.parse(JSON.stringify(rand));
      showToast("👿 괴수가 포효를 지르며 다가옵니다!", "error");
    } else {
      showToast("주변이 조용합니다. 아무 일도 일어나지 않았습니다.", "info");
    }
  }
  
  updateUI();
  saveGame();
}

function showResearchSelector() {
  DOM.researchItemList.innerHTML = "";
  
  const researchableRecipes = [];
  for (const [recipeKey, recipe] of Object.entries(CRAFTING_RECIPES)) {
    const isUnlocked = recipe.locked === false || (state.unlockedRecipes && state.unlockedRecipes.includes(recipeKey));
    if (isUnlocked) continue;
    
    const costKeys = Object.keys(recipe.cost);
    const ownedKinds = costKeys.filter(k => hasItemQty(k) > 0).length;
    const neededKinds = Math.ceil(costKeys.length / 2);
    
    if (ownedKinds >= neededKinds) {
      researchableRecipes.push({ key: recipeKey, recipe: recipe });
    }
  }
  
  if (researchableRecipes.length === 0) {
    showToast("연구(생각하기) 가능한 새로운 도안이 없습니다. (재료 종류 반 이상 보유 필요)", "error");
    return;
  }
  
  researchableRecipes.forEach(({ key, recipe }) => {
    const item = ITEM_DATABASE[key];
    const row = document.createElement("div");
    row.className = "combat-item-row";
    row.innerHTML = `
      <span>${item.icon} ${recipe.name}</span>
      <span style="font-size:0.75rem; color:var(--color-accent);">연구하기</span>
    `;
    row.addEventListener("click", () => {
      researchRecipe(key);
      DOM.researchSelectorModal.classList.add("hidden");
    });
    DOM.researchItemList.appendChild(row);
  });
  
  DOM.researchSelectorModal.classList.remove("hidden");
}

// 4. 펫 시스템
function tamePet(petId, petName) {
  discoverPet(petId); // 도감 발견 처리
  const petStats = {
    husky: { hp: 70, maxHp: 70, atk: 12, def: 4, avatar: "🐺" },
    arctic_fox: { hp: 50, maxHp: 50, atk: 10, def: 2, avatar: "🦊" },
    snow_owl: { hp: 40, maxHp: 40, atk: 8, def: 1, avatar: "🦉" },
    reindeer: { hp: 90, maxHp: 90, atk: 10, def: 6, avatar: "🦌" },
    seal: { hp: 60, maxHp: 60, atk: 6, def: 5, avatar: "🦭" },
    polar_bear: { hp: 150, maxHp: 150, atk: 25, def: 10, avatar: "🐻‍❄️" }
  };
  
  const base = petStats[petId] || petStats.husky;
  const newPet = {
    id: petId,
    name: petName,
    hp: base.hp,
    maxHp: base.maxHp,
    atk: base.atk,
    def: base.def,
    avatar: base.avatar,
    fedCount: 0,
    awakened: false
  };
  
  if (!state.pets) state.pets = [];
  state.pets.push(newPet);
  showToast(`신규 동물 펫 [${petName}]이 동료가 되었습니다!`, "success");
}

const PET_AWAKEN_INFO = {
  husky: { reqItemId: "tendon", reqItemQty: 2, reqAffection: 4, reqItemName: "동물 힘줄", skillName: "썰매 돌격", skillDesc: "적 30 피해 + 적 다음 공격력 50% 감소" },
  arctic_fox: { reqItemId: "herb", reqItemQty: 2, reqAffection: 3, reqItemName: "약초", skillName: "치유의 꼬리", skillDesc: "아군 30 치유 + 펫 20 치유" },
  snow_owl: { reqItemId: "feather", reqItemQty: 4, reqAffection: 3, reqItemName: "깃털", skillName: "매서운 눈빛", skillDesc: "적 1턴간 기절시킴 (턴 소모 스킵)" },
  reindeer: { reqItemId: "wood", reqItemQty: 4, reqAffection: 4, reqItemName: "나뭇가지", skillName: "가시 뿔 방벽", skillDesc: "3턴간 플레이어 피해 12 감소 방벽" },
  seal: { reqItemId: "cloth", reqItemQty: 2, reqAffection: 3, reqItemName: "깨끗한 천", skillName: "재주 넘기", skillDesc: "적 15 피해 + 플레이어 정신력 20 회복" },
  polar_bear: { reqItemId: "metal", reqItemQty: 3, reqAffection: 5, reqItemName: "고철 조각", skillName: "야수성 폭발", skillDesc: "적에게 45의 강력한 피해" }
};

function renderPets() {
  DOM.petList.innerHTML = "";
  if (!state.pets || state.pets.length === 0) {
    DOM.petList.innerHTML = '<p class="no-pets-desc">아직 동료 펫이 없습니다.</p>';
    return;
  }
  
  const rawMeatCount = state.inventory.filter(id => id === "raw_meat").length;
  const cookedMeatCount = state.inventory.filter(id => id === "cooked_meat").length;
  
  state.pets.forEach((pet, idx) => {
    if (pet.fedCount === undefined) pet.fedCount = 0;
    if (pet.awakened === undefined) pet.awakened = false;
    
    const awInfo = PET_AWAKEN_INFO[pet.id] || PET_AWAKEN_INFO.husky;
    const invHasQty = state.inventory.filter(id => id === awInfo.reqItemId).length;
    const canAwaken = !pet.awakened && pet.fedCount >= awInfo.reqAffection && invHasQty >= awInfo.reqItemQty;
    
    const petDiv = document.createElement("div");
    petDiv.className = "pet-item";
    petDiv.innerHTML = `
      <span class="pet-avatar" style="font-size: 1.6rem; display: flex; align-items: center; justify-content: center; width: 42px; height: 42px; background: rgba(255, 255, 255, 0.05); border-radius: 8px; border: 1px solid var(--border-glass);">${pet.avatar}${pet.awakened ? '⭐' : ''}</span>
      <div class="pet-details" style="flex: 1; margin-left: 10px;">
        <div class="pet-name-line" style="display: flex; justify-content: space-between; align-items: center; font-size: 0.82rem;">
          <strong style="color: ${pet.awakened ? '#f1c40f' : 'var(--color-text-main)'};">${pet.name} (${pet.hp <= 0 ? '기절' : '대기'})</strong>
          <span style="font-size: 0.72rem; color: var(--color-text-sub);">ATK ${pet.atk} / DEF ${pet.def}</span>
        </div>
        <div class="progress-bar-container" style="height: 6px; margin: 4px 0;">
          <div class="progress-bar health-bar" style="width: ${(pet.hp / pet.maxHp) * 100}%;"></div>
        </div>
        <div class="pet-stats-line" style="font-size: 0.72rem; color: var(--color-text-sub);">HP: ${pet.hp}/${pet.maxHp}</div>
        
        <div class="pet-affection-line" style="margin-top: 4px; display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--color-accent);">
          <span>친밀도: ${pet.fedCount} / ${awInfo.reqAffection}</span>
          ${pet.awakened ? '<span style="color:#f1c40f; font-weight:700;">[각성 완료]</span>' : ''}
        </div>
        
        ${!pet.awakened ? `
          <div class="pet-awaken-condition" style="font-size:0.68rem; color: var(--color-text-sub); margin-top:2px;">
            각성 필요: ${awInfo.reqItemName} ${invHasQty}/${awInfo.reqItemQty}개 보유
          </div>
        ` : `
          <div class="pet-awaken-condition" style="font-size:0.68rem; color: #2ecc71; margin-top:2px; font-weight: 500;">
            스킬: ${awInfo.skillName} (${awInfo.skillDesc})
          </div>
        `}
        
        <div class="pet-actions" style="margin-top: 8px; display: flex; gap: 4px; flex-wrap: wrap;">
          <button class="btn-pet-action" onclick="feedPet(${idx}, 'raw_meat')" ${rawMeatCount === 0 || pet.hp <= 0 ? 'disabled' : ''}>🥩 고기 (${rawMeatCount})</button>
          <button class="btn-pet-action" onclick="feedPet(${idx}, 'cooked_meat')" ${cookedMeatCount === 0 || pet.hp <= 0 ? 'disabled' : ''}>🍖 구운고기 (${cookedMeatCount})</button>
          ${!pet.awakened ? `
            <button class="btn-pet-action btn-pet-awaken" onclick="awakenPet(${idx})" ${!canAwaken ? 'disabled' : ''}>⚡ 각성</button>
          ` : ''}
        </div>
      </div>
    `;
    DOM.petList.appendChild(petDiv);
  });
}

// 펫 먹이 주기
window.feedPet = function(petIdx, foodType) {
  if (!state.pets || !state.pets[petIdx]) return;
  const pet = state.pets[petIdx];
  
  if (pet.hp <= 0) {
    showToast("기절한 펫에게는 먹이를 줄 수 없습니다. 먼저 치료가 필요합니다.", "error");
    return;
  }
  
  const success = removeFromInventory(foodType, 1);
  if (!success) {
    showToast("가방에 먹이가 부족합니다.", "error");
    return;
  }
  
  if (foodType === "raw_meat") {
    pet.fedCount = (pet.fedCount || 0) + 1;
    pet.hp = Math.min(pet.maxHp, pet.hp + 10);
    showToast(`${pet.name}에게 생고기를 먹였습니다. (친밀도 +1, HP +10)`, "success");
  } else if (foodType === "cooked_meat") {
    pet.fedCount = (pet.fedCount || 0) + 2;
    pet.hp = Math.min(pet.maxHp, pet.hp + 30);
    showToast(`${pet.name}에게 구운 고기를 먹였습니다. (친밀도 +2, HP +30)`, "success");
  }
  
  updateUI();
  saveGame();
};

// 펫 각성하기
window.awakenPet = function(petIdx) {
  if (!state.pets || !state.pets[petIdx]) return;
  const pet = state.pets[petIdx];
  const awInfo = PET_AWAKEN_INFO[pet.id] || PET_AWAKEN_INFO.husky;
  
  if (pet.awakened) {
    showToast("이미 각성한 펫입니다.", "error");
    return;
  }
  
  if ((pet.fedCount || 0) < awInfo.reqAffection) {
    showToast("친밀도가 부족하여 각성할 수 없습니다.", "error");
    return;
  }
  
  const hasQty = state.inventory.filter(id => id === awInfo.reqItemId).length;
  if (hasQty < awInfo.reqItemQty) {
    showToast("각성 재료가 부족합니다.", "error");
    return;
  }
  
  removeFromInventory(awInfo.reqItemId, awInfo.reqItemQty);
  
  pet.awakened = true;
  pet.maxHp += 20;
  pet.hp = pet.maxHp;
  pet.atk += 5;
  pet.def += 2;
  
  showToast(`⚡ ${pet.name}이(가) 각성했습니다! 최대체력, 공격력, 방어력이 대폭 상승하고 고유 스킬 [${awInfo.skillName}]을 해금했습니다!`, "success");
  
  if (!state.stats) {
    state.stats = { combatsWon: 0, ruinsSacrificed: 0, petAwakenCount: 0 };
  }
  state.stats.petAwakenCount++;
  checkAchievements();
  
  updateUI();
  saveGame();
};

// 5. 전투 시스템 제어부
function triggerCombat(monsterData) {
  // 만약 플레이어가 이미 사망한 상태라면 전투를 진행하지 않고 즉시 게임오버 처리
  if (state.health <= 0) {
    triggerGameOver();
    return;
  }
  
  discoverMonster(monsterData.id); // 도감 발견 처리
  combatState.active = true;
  combatState.petSkillUsed = false;
  combatState.monsterStunned = false;
  combatState.monsterDebuffed50 = false;
  combatState.playerShieldTurns = 0;
  combatState.playerShieldValue = 0;
  
  // 만약 monsterData가 enemies 배열을 들고 있다면 다중 전투로 취급
  if (monsterData.enemies && Array.isArray(monsterData.enemies) && monsterData.enemies.length > 0) {
    combatState.enemiesQueue = JSON.parse(JSON.stringify(monsterData.enemies));
  } else {
    // 단일 적
    combatState.enemiesQueue = [JSON.parse(JSON.stringify(monsterData))];
  }
  
  // 첫 번째 적을 큐에서 꺼냄
  combatState.monster = combatState.enemiesQueue.shift();
  
  // 화면 활성화 전환
  DOM.gameScreen.classList.remove("active");
  DOM.combatScreen.classList.add("active");
  
  // 펫 정보 설정
  const activePet = state.pets.find(p => p.hp > 0);
  if (activePet) {
    DOM.combatActivePetInfo.classList.remove("hidden");
    DOM.combatPetName.textContent = `${activePet.avatar}${activePet.awakened ? '⭐' : ''} ${activePet.name}`;
    DOM.combatPetHpBar.style.width = `${(activePet.hp / activePet.maxHp) * 100}%`;
    DOM.combatPetHpTxt.textContent = `HP: ${activePet.hp}/${activePet.maxHp}`;
    DOM.combatBtnPetAttack.classList.remove("hidden");
    
    if (activePet.awakened) {
      DOM.combatBtnPetSkill.classList.remove("hidden");
      DOM.combatBtnPetSkill.disabled = false;
      const awInfo = PET_AWAKEN_INFO[activePet.id] || PET_AWAKEN_INFO.husky;
      DOM.combatBtnPetSkill.textContent = `⚡ ${awInfo.skillName}`;
    } else {
      DOM.combatBtnPetSkill.classList.add("hidden");
    }
  } else {
    DOM.combatActivePetInfo.classList.add("hidden");
    DOM.combatBtnPetAttack.classList.add("hidden");
    DOM.combatBtnPetSkill.classList.add("hidden");
  }
  
  // 첫 조우 로그 출력
  if (monsterData.enemies && monsterData.enemies.length > 1) {
    DOM.combatLog.innerHTML = `<p style="color: var(--color-accent); font-weight:700;">🚨 [${monsterData.name}] 조우! 여러 명의 적들이 무리 지어 위협합니다. (총 ${monsterData.enemies.length}명)</p>`;
    logCombat(`⚔️ 첫 번째 적인 [${combatState.monster.name}]이(가) 먼저 앞장서서 위협적으로 대치합니다.`);
  } else {
    DOM.combatLog.innerHTML = `<p style="color: var(--color-accent); font-weight:700;">🚨 [${combatState.monster.name}] 조우! 대치 상황에 돌입합니다.</p>`;
  }
  
  updateCombatUI();
}

function updateCombatUI() {
  if (!combatState.active) return;
  const m = combatState.monster;
  
  DOM.monsterIcon.textContent = m.icon || "👾";
  
  const remainingCount = combatState.enemiesQueue.length;
  if (remainingCount > 0) {
    DOM.monsterName.textContent = `${m.name} (남은 적: ${remainingCount}명)`;
  } else {
    DOM.monsterName.textContent = m.name;
  }
  
  DOM.monsterHpBar.style.width = `${(m.hp / m.maxHp) * 100}%`;
  DOM.monsterHpTxt.textContent = `HP: ${m.hp}/${m.maxHp}`;
  
  // 플레이어 아군 HP
  DOM.combatPlayerHpBar.style.width = `${state.health}%`;
  DOM.combatPlayerHpTxt.textContent = `HP: ${state.health}/100`;
  
  // 펫 리렌더링
  const activePet = state.pets.find(p => p.hp > 0);
  if (activePet) {
    DOM.combatActivePetInfo.classList.remove("hidden");
    DOM.combatPetName.textContent = `${activePet.avatar} ${activePet.name}`;
    DOM.combatPetHpBar.style.width = `${(activePet.hp / activePet.maxHp) * 100}%`;
    DOM.combatPetHpTxt.textContent = `HP: ${activePet.hp}/${activePet.maxHp}`;
    DOM.combatBtnPetAttack.classList.remove("hidden");
  } else {
    DOM.combatActivePetInfo.classList.add("hidden");
    DOM.combatBtnPetAttack.classList.add("hidden");
  }
  
  // 눈뭉치 던지기 버튼 갱신
  const snowCount = hasItemQty("snow");
  DOM.combatBtnSnowball.disabled = (snowCount <= 0);
  DOM.combatBtnSnowball.innerHTML = `❄️ 눈뭉치 던지기 (${snowCount})`;
}

function logCombat(msg) {
  const p = document.createElement("p");
  p.innerHTML = msg;
  DOM.combatLog.appendChild(p);
  DOM.combatLog.scrollTop = DOM.combatLog.scrollHeight;
}

function getPlayerAttack() {
  let baseAtk = 20;
  let maxWeaponAtk = 0;
  let bestWeaponName = "";
  
  if (state.inventory) {
    state.inventory.forEach(itemId => {
      const item = ITEM_DATABASE[itemId];
      if (item && item.type === "무기" && item.atk !== undefined) {
        if (item.atk > maxWeaponAtk) {
          maxWeaponAtk = item.atk;
          bestWeaponName = item.name;
        }
      }
    });
  }
  
  return {
    total: baseAtk + maxWeaponAtk,
    weaponName: bestWeaponName,
    hasWeapon: maxWeaponAtk > 0
  };
}

function executePlayerAttack() {
  if (!combatState.active) return;
  
  const atkInfo = getPlayerAttack();
  if (atkInfo.hasWeapon) {
    logCombat(`🗡️ 소지 중인 [${atkInfo.weaponName}]을(를) 강하게 휘두릅니다!`);
  } else {
    logCombat("👊 주먹을 쥐고 맞섭니다.");
  }
  
  const m = combatState.monster;
  const rawDamage = atkInfo.total;
  const finalDamage = Math.max(1, rawDamage - m.def);
  
  m.hp = Math.max(0, m.hp - finalDamage);
  logCombat(`💥 플레이어가 [${m.name}]에게 **${finalDamage}**의 타격을 줬습니다.`);
  
  updateCombatUI();
  
  if (m.hp <= 0) {
    executeCombatVictory();
  } else {
    // 몬스터의 반격
    setTimeout(executeMonsterTurn, 1000);
  }
}

function executePetAttack() {
  if (!combatState.active) return;
  const activePet = state.pets.find(p => p.hp > 0);
  if (!activePet) return;
  
  const m = combatState.monster;
  const finalDamage = Math.max(1, activePet.atk - m.def);
  
  m.hp = Math.max(0, m.hp - finalDamage);
  logCombat(`🐾 펫 [${activePet.name}]이 돌진해 **${finalDamage}**의 데미지를 줬습니다!`);
  
  updateCombatUI();
  
  if (m.hp <= 0) {
    executeCombatVictory();
  } else {
    setTimeout(executeMonsterTurn, 1000);
  }
}

function executeSnowballAttack() {
  if (!combatState.active) return;
  if (hasItemQty("snow") <= 0) {
    showToast("눈뭉치가 없습니다!", "error");
    return;
  }
  
  removeFromInventory("snow", 1);
  const m = combatState.monster;
  const finalDamage = 4;
  m.hp = Math.max(0, m.hp - finalDamage);
  
  combatState.monsterDebuffed = true;
  
  logCombat(`❄️ 적 [${m.name}]의 안면에 차가운 눈뭉치를 강하게 투척했습니다! **${finalDamage}**의 고정 데미지를 입히고 다음 턴 공격력을 약화시킵니다.`);
  
  updateCombatUI();
  
  if (m.hp <= 0) {
    executeCombatVictory();
  } else {
    setTimeout(executeMonsterTurn, 1000);
  }
}

function executePetSkill() {
  if (!combatState.active) return;
  if (combatState.petSkillUsed) {
    showToast("이미 이번 전투에서 펫 각성 스킬을 사용했습니다.", "error");
    return;
  }
  
  const activePet = state.pets.find(p => p.hp > 0);
  if (!activePet || !activePet.awakened) {
    showToast("각성한 펫이 전투에 참여하고 있지 않습니다.", "error");
    return;
  }
  
  combatState.petSkillUsed = true;
  DOM.combatBtnPetSkill.disabled = true;
  
  const m = combatState.monster;
  
  logCombat(`⚡ [${activePet.name}]의 각성 스킬 발동!`);
  
  if (activePet.id === "husky") {
    m.hp = Math.max(0, m.hp - 30);
    combatState.monsterDebuffed50 = true;
    logCombat(`🐾 [${activePet.name}]이 세차게 돌진하여 [${m.name}]에게 **30**의 데미지를 입히고 1턴간 적의 힘을 절반으로 약화시켰습니다!`);
  } 
  else if (activePet.id === "arctic_fox") {
    state.health = Math.min(100, state.health + 30);
    activePet.hp = Math.min(activePet.maxHp, activePet.hp + 20);
    logCombat(`🦊 [${activePet.name}]이 따스한 빛이 서린 꼬리로 생존자를 쓸어내려 플레이어 HP **30** 회복, 본인 HP **20**을 치유했습니다!`);
  } 
  else if (activePet.id === "snow_owl") {
    combatState.monsterStunned = true;
    logCombat(`🦉 [${activePet.name}]의 날카로운 눈빛이 [${m.name}]의 뇌리를 강타했습니다! 다음 턴에 적은 완전히 기절하여 행동 불능이 됩니다.`);
  } 
  else if (activePet.id === "reindeer") {
    combatState.playerShieldTurns = 3;
    combatState.playerShieldValue = 12;
    logCombat(`🦌 [${activePet.name}]이 우뚝 솟은 뿔로 결계를 두릅니다! 3턴 동안 플레이어가 입는 모든 피해가 **12**만큼 고정 차감됩니다.`);
  } 
  else if (activePet.id === "seal") {
    m.hp = Math.max(0, m.hp - 15);
    state.sanity = Math.min(100, state.sanity + 20);
    logCombat(`🦭 [${activePet.name}]이 눈부신 회전을 하며 적을 강타해 **15** 데미지를 주고 생존자에게 활기를 불어넣어 정신력 **20**을 회복시켰습니다!`);
  } 
  else if (activePet.id === "polar_bear") {
    m.hp = Math.max(0, m.hp - 45);
    logCombat(`🐻‍❄️ [${activePet.name}]의 육중한 앞발이 맹렬히 회전하며 [${m.name}]을 강타했습니다! **45**의 강력한 물리 피해를 가합니다.`);
  }
  
  updateCombatUI();
  updateUI();
  
  if (m.hp <= 0) {
    executeCombatVictory();
  } else {
    setTimeout(executeMonsterTurn, 1200);
  }
}

function executeMonsterTurn() {
  if (!combatState.active) return;
  const m = combatState.monster;
  
  // 기절 상태 검사
  if (combatState.monsterStunned) {
    logCombat(`💤 [${m.name}]이(가) 기절 상태에서 헤어나오지 못해 이번 턴에 공격하지 못했습니다!`);
    combatState.monsterStunned = false;
    
    // 결계 턴 감소
    if (combatState.playerShieldTurns > 0) {
      combatState.playerShieldTurns--;
      if (combatState.playerShieldTurns === 0) {
        logCombat(`🛡️ 순록이 두른 가시 뿔 방벽의 결계가 해제되었습니다.`);
      }
    }
    updateCombatUI();
    return;
  }
  
  // 타겟 선정 (펫이 있으면 50% 확률로 펫 피격)
  const activePet = state.pets.find(p => p.hp > 0);
  const targetPet = activePet && Math.random() < 0.5;
  
  // 디버프 적용 연산
  let monsterAtk = m.atk;
  if (combatState.monsterDebuffed50) {
    monsterAtk = Math.round(monsterAtk * 0.5);
    logCombat(`💢 각성 디버프에 지배당한 [${m.name}]의 기력이 쇠해 공격력이 절반으로 깎였습니다! (50% 감소)`);
    combatState.monsterDebuffed50 = false;
  } else if (combatState.monsterDebuffed) {
    monsterAtk = Math.round(monsterAtk * 0.75);
    logCombat(`❄️ 눈발에 덮인 [${m.name}]이(가) 비틀거리며 공격력이 약화됩니다! (25% 감소)`);
    combatState.monsterDebuffed = false; // 1회성 적용 후 소멸
  }
  
  if (targetPet) {
    const finalDamage = Math.max(1, monsterAtk - activePet.def);
    activePet.hp = Math.max(0, activePet.hp - finalDamage);
    logCombat(`👿 [${m.name}]이 펫 [${activePet.name}]을 반격하여 **${finalDamage}**의 피해를 입혔습니다!`);
    if (activePet.hp <= 0) {
      logCombat(`💤 펫 [${activePet.name}]이 쓰러져 기절했습니다.`);
    }
  } else {
    // 플레이어 피격 (방어력 적용)
    const pDef = getPlayerDefense();
    let finalDamage = Math.max(1, monsterAtk - pDef);
    
    // 방벽 피해 감면
    if (combatState.playerShieldTurns > 0) {
      const shieldVal = combatState.playerShieldValue || 12;
      const originalDmg = finalDamage;
      finalDamage = Math.max(1, finalDamage - shieldVal);
      logCombat(`🛡️ 순록의 가시 방벽이 빛나며 적의 피해를 감쇄시켰습니다! (피해: ${originalDmg} -> ${finalDamage})`);
    }
    
    state.health = Math.max(0, state.health - finalDamage);
    logCombat(`🔥 [${m.name}]이 플레이어에게 돌진해 **${finalDamage}**의 생명력 상실을 유도했습니다! (방어력: ${pDef})`);
    
    if (state.health <= 0) {
      logCombat("💀 플레이어의 정신이 점차 희미해집니다...");
      setTimeout(() => {
        endCombat();
        triggerGameOver();
      }, 1500);
      return;
    }
  }
  
  // 결계 턴 감소
  if (combatState.playerShieldTurns > 0) {
    combatState.playerShieldTurns--;
    if (combatState.playerShieldTurns === 0) {
      logCombat(`🛡️ 순록이 두른 가시 뿔 방벽의 결계가 해제되었습니다.`);
    }
  }
  
  updateCombatUI();
}

function showCombatItemSelector() {
  DOM.combatItemList.innerHTML = "";
  
  // 회복 기능 아이템 선별
  const recoveryItems = state.inventory.filter((itemId, idx) => {
    const item = ITEM_DATABASE[itemId];
    return item.usable && item.effect && (item.effect.health || item.effect.sanity || item.effect.hunger);
  });
  
  if (recoveryItems.length === 0) {
    showToast("가방에 요긴한 회복 보급품이 전혀 없습니다.", "error");
    return;
  }
  
  // 고유 키 기준 출력
  const uniqueItems = [...new Set(recoveryItems)];
  uniqueItems.forEach(itemId => {
    const item = ITEM_DATABASE[itemId];
    const qty = state.inventory.filter(id => id === itemId).length;
    
    const row = document.createElement("div");
    row.className = "combat-item-row";
    row.innerHTML = `
      <span>${getItemIconHtml(item, "1.1em")} ${item.name} (${qty}개)</span>
      <span style="font-size:0.75rem; color:var(--color-text-sub);">${item.desc}</span>
    `;
    
    row.addEventListener("click", () => {
      useCombatItem(itemId);
    });
    DOM.combatItemList.appendChild(row);
  });
  
  DOM.combatItemSelector.classList.remove("hidden");
}

function hideCombatItemSelector() {
  DOM.combatItemSelector.classList.add("hidden");
}

function useCombatItem(itemId) {
  // 인벤토리에서 실질 소모
  if (removeFromInventory(itemId, 1)) {
    const item = ITEM_DATABASE[itemId];
    if (item.effect) {
      for (const [stat, val] of Object.entries(item.effect)) {
        const limit = (stat === "health") ? getPlayerMaxHealth() : 100;
        state[stat] = Math.min(limit, Math.max(0, state[stat] + val));
      }
    }
    logCombat(`💊 [${item.name}]을 복용해 치료 효과를 받았습니다!`);
    updateCombatUI();
    hideCombatItemSelector();
    
    // 아이템 사용은 안전 행동으로 턴 소모 없이 복귀
    saveGame();
  }
}

function attemptEscape() {
  if (state.hunger < 20) {
    showToast("허기가 부족해 도망칠 힘이 없습니다. (최소 20 필요)", "error");
    return;
  }
  
  state.hunger = Math.max(0, state.hunger - 20);
  const success = Math.random() < 0.5;
  
  if (success) {
    logCombat("🏃 필사적으로 질주하여 위기 탈출에 성공했습니다!");
    showToast("도망에 성공했습니다.", "info");
    setTimeout(endCombat, 1500);
  } else {
    logCombat("🚫 눈길에 미끄러져 몬스터에게 꼬리를 밟혔습니다! (탈출 실패)");
    updateCombatUI();
    setTimeout(executeMonsterTurn, 1000);
  }
}

function executeCombatVictory() {
  const m = combatState.monster;
  
  // 전리품 복사
  let rewards = m.rewards ? JSON.parse(JSON.stringify(m.rewards)) : [];
  
  // 동물류 판정: 'raider'와 'guard_robot'이 아님
  if (m.id !== "raider" && m.id !== "guard_robot") {
    // 기존 rewards에서 raw_meat가 있다면 제거 (중복 지급 방지)
    rewards = rewards.filter(r => r.id !== "raw_meat");
    // 생고기 1~2개 랜덤 추가
    const meatQty = Math.floor(Math.random() * 2) + 1;
    rewards.push({ id: "raw_meat", qty: meatQty });
  }
  
  // 전리품 지급
  rewards.forEach(r => {
    addToInventory(r.id, r.qty);
  });
  
  // 만약 큐에 남은 적이 있다면, 다음 적을 꺼내서 매칭
  if (combatState.enemiesQueue && combatState.enemiesQueue.length > 0) {
    const oldName = m.name;
    combatState.monster = combatState.enemiesQueue.shift();
    discoverMonster(combatState.monster.id); // 다음 몬스터 도감 등록
    
    // 전투 디버프 및 상태 리셋
    combatState.monsterStunned = false;
    combatState.monsterDebuffed50 = false;
    combatState.monsterDebuffed = false;
    
    logCombat(`💀 [${oldName}] 처치 완료! 전리품이 가방에 추가되었습니다.`);
    logCombat(`📢 뒤이어 **[${combatState.monster.name}]**이(가) 눈길을 헤치며 대치선에 새로 합류합니다!`);
    
    updateCombatUI();
  } else {
    // 모든 몬스터를 물리침 (최종 승리)
    logCombat(`💀 [${m.name}] 처치 완료! 전리품이 가방에 추가되었습니다.`);
    logCombat(`🎉 모든 위협을 격퇴하고 전투에서 완벽한 승리를 거뒀습니다!`);
    
    if (!state.stats) {
      state.stats = { combatsWon: 0, ruinsSacrificed: 0, petAwakenCount: 0 };
    }
    state.stats.combatsWon++;
    checkAchievements();
    
    setTimeout(() => {
      endCombat();
    }, 2000);
  }
}

function endCombat() {
  combatState.active = false;
  combatState.monster = null;
  
  DOM.combatScreen.classList.remove("active");
  
  // 플레이어가 생존해 있을 때만 게임 화면을 다시 활성화합니다.
  if (state.health > 0) {
    DOM.gameScreen.classList.add("active");
  }
  
  updateUI();
  saveGame();
}

// 상인 판매 20가지 품목
// 상인 판매 25가지 품목으로 확장 (일부 무기류 추가)
const MERCHANT_ITEMS = [
  "matches", "wood", "water", "cooked_meat", "herb", 
  "medkit", "spear", "tent", "coal", "scrap_circuit", 
  "hat_wool", "pants_wool", "boots_wool", "coat_wool", "bag_small", 
  "journal_cooking", "journal_friction", "flint", "wire", "hide",
  "stone_knife", "bone_dagger", "scrap_axe", "hunting_bow", "crossbow",
  "herb_tea", "steel_plate", "electric_motor", "energy_core"
];

// 상인 거래 가치 매핑 테이블
const ITEM_VALUES = {
  wood: { buy: 4, sell: 2 },
  matches: { buy: 8, sell: 4 },
  snow: { buy: 2, sell: 1 },
  water: { buy: 12, sell: 6 },
  raw_meat: { buy: 15, sell: 7 },
  cooked_meat: { buy: 30, sell: 15 },
  fish: { buy: 20, sell: 9 },
  cooked_fish: { buy: 40, sell: 18 },
  egg: { buy: 15, sell: 7 },
  boiled_egg: { buy: 30, sell: 14 },
  hide: { buy: 22, sell: 10 },
  metal: { buy: 22, sell: 10 },
  herb: { buy: 25, sell: 12 },
  cloth: { buy: 20, sell: 9 },
  campfire: { buy: 30, sell: 14 },
  spear: { buy: 70, sell: 32 },
  tent: { buy: 140, sell: 65 },
  medkit: { buy: 60, sell: 28 },
  wire: { buy: 18, sell: 8 },
  flint: { buy: 15, sell: 7 },
  coal: { buy: 20, sell: 9 },
  feather: { buy: 15, sell: 7 },
  tendon: { buy: 20, sell: 9 },
  scrap_circuit: { buy: 40, sell: 18 },
  herb_tea: { buy: 20, sell: 10 },
  steel_plate: { buy: 50, sell: 23 },
  electric_motor: { buy: 70, sell: 32 },
  energy_core: { buy: 120, sell: 55 },
  
  // 신규 무기류 가치 등록
  stone_knife: { buy: 15, sell: 7 },
  bone_dagger: { buy: 22, sell: 10 },
  scrap_axe: { buy: 35, sell: 16 },
  hunting_bow: { buy: 48, sell: 22 },
  barbed_club: { buy: 55, sell: 25 },
  iron_sword: { buy: 65, sell: 30 },
  heavy_mace: { buy: 85, sell: 40 },
  harpoon: { buy: 95, sell: 45 },
  machete: { buy: 110, sell: 50 },
  crossbow: { buy: 130, sell: 60 },
  chainsaw_sword: { buy: 160, sell: 75 },
  shock_baton: { buy: 190, sell: 90 },
  plasma_cutter: { buy: 230, sell: 110 },
  polar_titan_lance: { buy: 270, sell: 130 },
  alloy_greatsword: { buy: 310, sell: 150 },
  laser_scythe: { buy: 380, sell: 185 },
  
  // 신규 방어구들
  hat_wool: { buy: 30, sell: 14 },
  hat_scraps: { buy: 50, sell: 23 },
  hat_fur: { buy: 45, sell: 20 },
  hat_goggles: { buy: 45, sell: 20 },
  hat_fox: { buy: 60, sell: 27 },
  hat_bear: { buy: 90, sell: 40 },
  hat_feather: { buy: 35, sell: 16 },
  hat_heavy: { buy: 50, sell: 23 },
  
  coat_wool: { buy: 45, sell: 20 },
  coat_fur: { buy: 75, sell: 34 },
  coat_scraps: { buy: 90, sell: 40 },
  coat_tactical: { buy: 95, sell: 43 },
  coat_feather: { buy: 100, sell: 45 },
  coat_bear: { buy: 180, sell: 85 },
  coat_heavy: { buy: 90, sell: 40 },
  coat_thermal_adv: { buy: 85, sell: 38 },
  
  pants_wool: { buy: 30, sell: 14 },
  pants_fur: { buy: 50, sell: 23 },
  pants_scraps: { buy: 60, sell: 27 },
  pants_combat: { buy: 65, sell: 30 },
  pants_thermal: { buy: 80, sell: 36 },
  pants_bear: { buy: 110, sell: 50 },
  pants_feather: { buy: 40, sell: 18 },
  pants_heavy: { buy: 55, sell: 25 },
  
  boots_wool: { buy: 20, sell: 9 },
  boots_leather: { buy: 35, sell: 16 },
  boots_scraps: { buy: 45, sell: 20 },
  boots_combat: { buy: 50, sell: 23 },
  boots_insulated: { buy: 60, sell: 27 },
  boots_bear: { buy: 95, sell: 43 },
  boots_feather: { buy: 25, sell: 11 },
  boots_heavy: { buy: 40, sell: 18 },
  
  bag_small: { buy: 50, sell: 23 },
  bag_medium: { buy: 80, sell: 36 },
  bag_large: { buy: 130, sell: 60 },
  bag_thermal: { buy: 100, sell: 45 },
  bag_tactical: { buy: 150, sell: 70 },
  bag_academic: { buy: 80, sell: 36 },
  
  journal_hunting: { buy: 100, sell: 45 },
  journal_cooking: { buy: 100, sell: 45 },
  journal_meditation: { buy: 100, sell: 45 },
  journal_engineering: { buy: 100, sell: 45 },
  journal_scouting: { buy: 100, sell: 45 },
  journal_taming: { buy: 100, sell: 45 },
  journal_thinking: { buy: 100, sell: 45 },
  journal_friction: { buy: 100, sell: 45 },
  journal_attraction: { buy: 100, sell: 45 }
};

// 상인 방문 이벤트 빌더 (가중치 추출 20% 보정 적용)
function generateMerchantEvent() {
  state.lastMerchantItems = state.lastMerchantItems || [];
  
  const availableItems = [...MERCHANT_ITEMS];
  const chosen = [];
  
  for (let step = 0; step < 5; step++) {
    let totalWeight = 0;
    const weights = availableItems.map(itemId => {
      const isOld = state.lastMerchantItems.includes(itemId);
      const weight = isOld ? 100 : 120;
      totalWeight += weight;
      return { itemId, weight };
    });
    
    let rand = Math.random() * totalWeight;
    let selectedIdx = 0;
    for (let i = 0; i < weights.length; i++) {
      rand -= weights[i].weight;
      if (rand <= 0) {
        selectedIdx = i;
        break;
      }
    }
    
    const picked = availableItems.splice(selectedIdx, 1)[0];
    chosen.push(picked);
  }
  
  state.lastMerchantItems = [...chosen];
  
  return {
    id: "ev_merchant",
    title: "🤝 극지 상인의 방문",
    description: "생존 영역에 개 썰매를 이끌고 찾아온 신비로운 극지 상인이 교역을 제안합니다. 가방 속 물건을 적정가에 처분하거나, 유용한 장비를 구매해 보세요.",
    type: "상인",
    merchantItems: chosen
  };
}

let currentMerchantTab = "buy";

function renderMerchantModal(tab = "buy") {
  currentMerchantTab = tab;
  
  if (tab === "buy") {
    DOM.merchantTabBuy.className = "btn btn-small btn-primary";
    DOM.merchantTabSell.className = "btn btn-small btn-secondary";
  } else {
    DOM.merchantTabBuy.className = "btn btn-small btn-secondary";
    DOM.merchantTabSell.className = "btn btn-small btn-primary";
  }
  
  DOM.merchantGoldInfo.textContent = `보유 골드: ${state.gold} G`;
  DOM.merchantItemList.innerHTML = "";
  
  const ev = state.currentEvent;
  if (!ev || ev.id !== "ev_merchant") return;
  
  const merchantItems = ev.merchantItems || [];
  if (tab === "buy") {
    merchantItems.forEach(itemId => {
      const item = ITEM_DATABASE[itemId];
      const val = ITEM_VALUES[itemId] || { buy: 10, sell: 3 };
      const row = document.createElement("div");
      row.className = "discard-item-row";
      const badgeClass = BADGE_CLASS_MAP[item.type] || "badge-material";
      const statMsg = getItemStatString(item, itemId);
      const descText = statMsg ? `${item.desc} <span style="color:var(--color-accent); font-weight:700;">[${statMsg}]</span>` : item.desc;
      row.innerHTML = `
        <div style="display:flex; align-items:center; flex:1; overflow:hidden;">
          <span class="discard-item-avatar">${getItemIconHtml(item, "2.2rem")}</span>
          <div style="display:flex; flex-direction:column; margin-left:8px; overflow:hidden; text-overflow:ellipsis;">
            <span class="discard-item-name" style="font-weight:700;">${item.name}</span>
            <span style="font-size:0.68rem; color:var(--color-text-sub); white-space: normal; line-height: 1.3; margin-top: 2px;">${descText}</span>
          </div>
        </div>
        <span class="item-badge ${badgeClass}" style="position:static; margin-right:8px; font-size:0.6rem; flex-shrink:0;">${item.type}</span>
        <button class="discard-btn" style="background:var(--color-primary); flex-shrink:0;" onclick="buyMerchantItem('${itemId}')">${val.buy} G 구매</button>
      `;
      DOM.merchantItemList.appendChild(row);
    });
  } else {
    const invMap = {};
    state.inventory.forEach(itemId => {
      invMap[itemId] = (invMap[itemId] || 0) + 1;
    });
    
    Object.keys(invMap).forEach(itemId => {
      const item = ITEM_DATABASE[itemId];
      const qty = invMap[itemId];
      const val = ITEM_VALUES[itemId] || { buy: 10, sell: 3 };
      const row = document.createElement("div");
      row.className = "discard-item-row";
      const badgeClass = BADGE_CLASS_MAP[item.type] || "badge-material";
      const statMsg = getItemStatString(item, itemId);
      const descText = statMsg ? `${item.desc} <span style="color:var(--color-accent); font-weight:700;">[${statMsg}]</span>` : item.desc;
      row.innerHTML = `
        <div style="display:flex; align-items:center; flex:1; overflow:hidden;">
          <span class="discard-item-avatar">${getItemIconHtml(item, "2.2rem")}</span>
          <div style="display:flex; flex-direction:column; margin-left:8px; overflow:hidden;">
            <span class="discard-item-name" style="font-weight:700;">${item.name} (보유: ${qty}개)</span>
            <span style="font-size:0.68rem; color:var(--color-text-sub); white-space: normal; line-height: 1.3; margin-top: 2px;">${descText}</span>
          </div>
        </div>
        <span class="item-badge ${badgeClass}" style="position:static; margin-right:8px; font-size:0.6rem; flex-shrink:0;">${item.type}</span>
        <button class="discard-btn" style="flex-shrink:0;" onclick="sellMerchantItem('${itemId}')">${val.sell} G 판매</button>
      `;
      DOM.merchantItemList.appendChild(row);
    });
    
    if (state.inventory.length === 0) {
      DOM.merchantItemList.innerHTML = '<p style="text-align:center; color:var(--color-text-sub); font-size:0.8rem; padding: 20px; width:100%;">가방에 상인에게 판매할 물건이 없습니다.</p>';
    }
  }
}

window.buyMerchantItem = function(itemId) {
  const val = ITEM_VALUES[itemId] || { buy: 10, sell: 3 };
  if (state.gold < val.buy) {
    showToast("보유 골드가 부족합니다.", "error");
    return;
  }
  
  state.gold -= val.buy;
  
  addToInventory(itemId, 1);
  renderMerchantModal(currentMerchantTab);
};

window.sellMerchantItem = function(itemId) {
  const val = ITEM_VALUES[itemId] || { buy: 10, sell: 3 };
  
  const success = removeFromInventory(itemId, 1);
  if (!success) {
    showToast("해당 아이템이 가방에 없습니다.", "error");
    return;
  }
  
  state.gold += val.sell;
  showToast(`${ITEM_DATABASE[itemId].name}을(를) 상인에게 ${val.sell} G에 판매했습니다.`, "success");
  
  renderMerchantModal(currentMerchantTab);
};

// ==========================================
// 도전과제 & 아카이브(도감) & 백업/복구 시스템
// ==========================================

// 1. 몬스터 정보 데이터베이스
const MONSTER_DATABASE = {
  wolf: { name: "굶주린 늑대", icon: "🐺", desc: "매서운 눈빛으로 극지를 방황하는 야생 늑대. 호전성이 매우 높습니다." },
  polar_bear: { name: "동굴 북극곰", icon: "🐻‍❄️", desc: "빙하 동굴을 수호하는 거대한 북극곰. 무시무시한 공격력과 체력을 가집니다." },
  yeti: { name: "설산 거대 예티", icon: "👹", desc: "고대 눈보라 전설 속에 등장하는 괴수. 강력한 기절 포효를 내지릅니다." },
  guard_robot: { name: "군용 경비로봇", icon: "🤖", desc: "버려진 비밀 군사 기지 잔해를 순찰하며 침입자를 단죄하는 살인 기계." },
  raider: { name: "극지 약탈자", icon: "👤", desc: "추위와 고독에 미쳐 다른 생존자들의 자원을 노리는 약탈자 집단." },
  snow_leopard: { name: "눈표범", icon: "🐆", desc: "은밀하게 눈 더미 속에 매복해 사냥감의 숨통을 노리는 날렵한 맹수." },
  corrupted_dog: { name: "오염된 들개", icon: "🐕", desc: "알 수 없는 기계화 독소에 감염되어 성정이 극도로 포악해진 야생 들개." }
};

// 2. 도전과제 데이터베이스
const ACHIEVEMENTS_DATABASE = {
  ach_first_day: { title: "새벽의 여명", desc: "가혹한 극지에서 살아남아 생존 2일차에 진입하십시오.", check: (s) => s.day >= 2 },
  ach_survive_10: { title: "극지 적응자", desc: "영하의 혹한에 적응하며 10일 동안 생존하십시오.", check: (s) => s.day >= 10 },
  ach_survive_20: { title: "설산의 지배자", desc: "칼바람을 뚫고 20일 동안 끈질기게 생존하십시오.", check: (s) => s.day >= 20 },
  ach_craft_spear: { title: "결전 병기", desc: "호신 및 사냥용 필수 무기인 '철제 창'을 제작하십시오.", check: (s) => s.inventory.includes("spear") },
  ach_get_pet: { title: "든든한 동반자", desc: "야생 동물을 조련하여 첫 번째 동료 펫을 획득하십시오.", check: (s) => s.pets && s.pets.length >= 1 },
  ach_tame_bear: { title: "웅장한 발걸음", desc: "극강의 야수 '북극곰'을 펫으로 길들이는 데 성공하십시오.", check: (s) => s.pets && s.pets.some(p => p.id === "polar_bear") },
  ach_max_sanity: { title: "강철의 평정심", desc: "명상이나 온기를 통해 정신력을 최대 수치(100)로 회복하십시오.", check: (s) => s.sanity >= 100 },
  ach_heavy_armor: { title: "걸어다니는 성벽", desc: "중장갑 판금을 겹겹이 껴입어 총 방어력을 20 이상 달성하십시오.", check: (s) => getPlayerDefense() >= 20 },
  ach_full_bag: { title: "보따리 장수", desc: "가방 크기가 28칸 이상인 대형 배낭(군용/전술 중장비 배낭)을 장착하십시오.", check: (s) => s.equipment && (s.equipment.bag === "bag_large" || s.equipment.bag === "bag_tactical") },
  ach_escape: { title: "극지 탈출기", desc: "구조 요원과 접촉하여 대망의 생존 탈출에 완벽히 성공하십시오.", check: (s) => s.gameOver && s.health > 0 },
  
  // 신규 도전과제 10종 추가
  ach_combats_5: { title: "투신", desc: "누적 전투에서 5회 이상 승리하십시오.", check: (s) => s.stats && s.stats.combatsWon >= 5 },
  ach_ruins_sacrifice: { title: "고대의 메아리", desc: "유적지 제단에 제물을 1회 이상 바치십시오.", check: (s) => s.stats && s.stats.ruinsSacrificed >= 1 },
  ach_pet_awaken: { title: "초월적 진화", desc: "펫을 1마리 이상 각성시키는 데 성공하십시오.", check: (s) => s.stats && s.stats.petAwakenCount >= 1 },
  ach_gold_150: { title: "극지의 자산가", desc: "150골드(G) 이상을 동시에 보유하십시오.", check: (s) => s.gold >= 150 },
  ach_pet_collector: { title: "동물 애호가", desc: "펫을 3마리 이상 동시에 보유하십시오.", check: (s) => s.pets && s.pets.length >= 3 },
  ach_three_journals: { title: "다재다능한 생존자", desc: "일지(활동) 슬롯에 일지를 3개 이상 장착하십시오.", check: (s) => s.equipment && s.equipment.journals && s.equipment.journals.filter(j => j !== null).length >= 3 },
  ach_medkits_3: { title: "구급대원", desc: "가방에 구급상자를 3개 이상 동시에 소지하십시오.", check: (s) => s.inventory.filter(id => id === 'medkit').length >= 3 },
  ach_low_health_survive: { title: "사선에서 돌아온 자", desc: "체력이 10 이하인 상태에서 생존하여 하루를 보내십시오.", check: (s) => s.health > 0 && s.health <= 10 && !s.gameOver },
  ach_naked_7: { title: "자연인", desc: "머리, 몸통, 다리, 발 장비칸에 아무런 장비도 입지 않고 7일차 이상 도달하십시오.", check: (s) => s.day >= 7 && s.equipment && !s.equipment.head && !s.equipment.body && !s.equipment.legs && !s.equipment.feet },
  ach_frostbite: { title: "동상 환자", desc: "체온이 0 이하로 떨어져 저체온증 피해를 입으십시오.", check: (s) => s.warmth <= 0 }
};

// 3. 세이브 암호화 / 복호화 헬퍼 (XOR + Base64)
function encryptData(str) {
  const key = "frostbite_key";
  let xorStr = "";
  for (let i = 0; i < str.length; i++) {
    xorStr += String.fromCharCode(str.charCodeAt(i) ^ key.charCodeAt(i % key.length));
  }
  return btoa(unescape(encodeURIComponent(xorStr)));
}

function decryptData(b64) {
  const key = "frostbite_key";
  const str = decodeURIComponent(escape(atob(b64)));
  let xorStr = "";
  for (let i = 0; i < str.length; i++) {
    xorStr += String.fromCharCode(str.charCodeAt(i) ^ key.charCodeAt(i % key.length));
  }
  return xorStr;
}

// 4. 발견 및 아카이브 기록 등록 처리기
function discoverItem(itemId) {
  if (!state.discoveredItems) state.discoveredItems = [];
  if (!state.discoveredEquipments) state.discoveredEquipments = [];
  const item = ITEM_DATABASE[itemId];
  if (!item) return;

  if (item.equippable) {
    if (!state.discoveredEquipments.includes(itemId)) {
      state.discoveredEquipments.push(itemId);
    }
  } else {
    if (!state.discoveredItems.includes(itemId)) {
      state.discoveredItems.push(itemId);
    }
  }
}

function discoverMonster(monsterId) {
  if (!state.discoveredMonsters) state.discoveredMonsters = [];
  if (monsterId && !state.discoveredMonsters.includes(monsterId)) {
    state.discoveredMonsters.push(monsterId);
  }
}

function discoverPet(petId) {
  if (!state.discoveredPets) state.discoveredPets = [];
  if (petId && !state.discoveredPets.includes(petId)) {
    state.discoveredPets.push(petId);
  }
}

function discoverRecipe(recipeKey) {
  if (!state.discoveredRecipes) state.discoveredRecipes = [];
  if (recipeKey && !state.discoveredRecipes.includes(recipeKey)) {
    state.discoveredRecipes.push(recipeKey);
  }
}

// 기존 정보 세이브 파일 복구 시 도감 동기화
function syncDiscoveries() {
  if (!state.discoveredItems) state.discoveredItems = [];
  if (!state.discoveredEquipments) state.discoveredEquipments = [];
  if (!state.discoveredPets) state.discoveredPets = [];
  if (!state.discoveredRecipes) state.discoveredRecipes = [];
  if (!state.discoveredMonsters) state.discoveredMonsters = [];

  // 인벤토리 아이템 일괄 등록
  if (state.inventory) {
    state.inventory.forEach(itemId => discoverItem(itemId));
  }
  // 현재 장착 장비 일괄 등록
  if (state.equipment) {
    for (const [slot, itemId] of Object.entries(state.equipment)) {
      if (slot === "journals" && Array.isArray(itemId)) {
        itemId.forEach(jId => { if (jId) discoverItem(jId); });
      } else if (itemId) {
        discoverItem(itemId);
      }
    }
  }
  // 보유 중인 펫 일괄 등록
  if (state.pets) {
    state.pets.forEach(pet => discoverPet(pet.id));
  }
  // 해금된 레시피 일괄 등록
  if (state.unlockedRecipes) {
    state.unlockedRecipes.forEach(recipeKey => discoverRecipe(recipeKey));
  }
  
  // 기본적으로 해금된 조합법 도감 등록
  for (const [recipeKey, recipe] of Object.entries(CRAFTING_RECIPES)) {
    if (!recipe.locked) {
      discoverRecipe(recipeKey);
    }
  }
}

// 5. 도전과제 실시간 감시자
function checkAchievements() {
  if (!state.achievements) state.achievements = [];
  
  let updated = false;
  for (const [id, ach] of Object.entries(ACHIEVEMENTS_DATABASE)) {
    if (state.achievements.includes(id)) continue;
    
    try {
      if (ach.check(state)) {
        state.achievements.push(id);
        showToast(`🏆 도전과제 달성! [${ach.title}] - ${ach.desc}`, "success");
        updated = true;
      }
    } catch (e) {
      console.warn("도전과제 감지 체크 예외:", e);
    }
  }
  
  if (updated) {
    saveGame();
  }
}

// 6. 아카이브 모달 렌더러
let currentArchiveTab = "achievements";

function renderArchive(tabName = "achievements") {
  currentArchiveTab = tabName;
  const listEl = document.getElementById("archive-content-list");
  if (!listEl) return;
  
  listEl.innerHTML = "";
  
  // 모든 탭 버튼 상태 업데이트
  const tabBtns = document.querySelectorAll(".archive-tab-btn");
  tabBtns.forEach(btn => {
    if (btn.dataset.tab === tabName) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  state.achievements = state.achievements || [];
  state.discoveredItems = state.discoveredItems || [];
  state.discoveredEquipments = state.discoveredEquipments || [];
  state.discoveredRecipes = state.discoveredRecipes || [];
  state.discoveredMonsters = state.discoveredMonsters || [];
  state.discoveredPets = state.discoveredPets || [];

  if (tabName === "achievements") {
    // 도전과제 탭 렌더링
    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.gap = "8px";
    
    for (const [id, ach] of Object.entries(ACHIEVEMENTS_DATABASE)) {
      const isUnlocked = state.achievements.includes(id);
      const card = document.createElement("div");
      card.className = `achievement-card ${isUnlocked ? "unlocked" : ""}`;
      card.innerHTML = `
        <span class="achievement-medal">${isUnlocked ? "🏆" : "🔒"}</span>
        <div class="achievement-details">
          <div class="achievement-title-line">
            <span class="achievement-title">${ach.title}</span>
            <span class="achievement-status-badge">${isUnlocked ? "달성 완료" : "잠김"}</span>
          </div>
          <span class="achievement-desc">${ach.desc}</span>
        </div>
      `;
      container.appendChild(card);
    }
    listEl.appendChild(container);
  }
  else if (tabName === "items") {
    // 기본 소모품/재료 아이템 도감 렌더링 (그리드)
    const grid = document.createElement("div");
    grid.className = "archive-grid";
    
    for (const [itemId, item] of Object.entries(ITEM_DATABASE)) {
      if (item.equippable) continue; // 장비 탭에서 렌더링
      
      const isDiscovered = state.discoveredItems.includes(itemId);
      const card = document.createElement("div");
      card.className = `archive-item-card ${isDiscovered ? "" : "locked"}`;
      
      if (isDiscovered) {
        const statMsg = getItemStatString(item, itemId);
        const descText = statMsg ? `${item.desc} [${statMsg}]` : item.desc;
        card.innerHTML = `
          <span class="archive-card-icon">${getItemIconHtml(item, "2.2rem")}</span>
          <div class="archive-card-info">
            <span class="archive-card-title">${item.name}</span>
            <span class="archive-card-desc">${descText}</span>
          </div>
        `;
      } else {
        card.innerHTML = `
          <span class="archive-card-icon">❓</span>
          <div class="archive-card-info">
            <span class="archive-card-title" style="color:var(--color-text-sub);">미발견 아이템</span>
            <span class="archive-card-desc">극지를 탐색하며 직접 획득하거나 사용해보십시오.</span>
          </div>
        `;
      }
      grid.appendChild(card);
    }
    listEl.appendChild(grid);
  }
  else if (tabName === "equipments") {
    // 장비(의복/가방) 도감 렌더링 (그리드)
    const grid = document.createElement("div");
    grid.className = "archive-grid";
    
    for (const [itemId, item] of Object.entries(ITEM_DATABASE)) {
      if (!item.equippable) continue;
      
      const isDiscovered = state.discoveredEquipments.includes(itemId);
      const card = document.createElement("div");
      card.className = `archive-item-card ${isDiscovered ? "" : "locked"}`;
      
      if (isDiscovered) {
        const statMsg = getItemStatString(item, itemId);
        const descText = statMsg ? `${item.desc} [${statMsg}]` : item.desc;
        card.innerHTML = `
          <span class="archive-card-icon">${getItemIconHtml(item, "2.2rem")}</span>
          <div class="archive-card-info">
            <span class="archive-card-title">${item.name}</span>
            <span class="archive-card-desc">${descText}</span>
          </div>
        `;
      } else {
        card.innerHTML = `
          <span class="archive-card-icon">❓</span>
          <div class="archive-card-info">
            <span class="archive-card-title" style="color:var(--color-text-sub);">미발견 장비</span>
            <span class="archive-card-desc">가죽 가공 및 기계 연구를 통해 장비를 발견하십시오.</span>
          </div>
        `;
      }
      grid.appendChild(card);
    }
    listEl.appendChild(grid);
  }
  else if (tabName === "recipes") {
    // 해금된 레시피 도감 렌더링 (그리드)
    const grid = document.createElement("div");
    grid.className = "archive-grid";
    
    for (const [recipeKey, recipe] of Object.entries(CRAFTING_RECIPES)) {
      const item = ITEM_DATABASE[recipeKey];
      if (!item) continue;
      
      const isDiscovered = state.discoveredRecipes.includes(recipeKey);
      const card = document.createElement("div");
      card.className = `archive-item-card ${isDiscovered ? "" : "locked"}`;
      
      if (isDiscovered) {
        let costNames = [];
        for (const [costId, reqQty] of Object.entries(recipe.cost)) {
          const costItem = ITEM_DATABASE[costId];
          if (costItem) costNames.push(`${getItemIconHtml(costItem, "1em")}${costItem.name}x${reqQty}`);
        }
        card.innerHTML = `
          <span class="archive-card-icon">${getItemIconHtml(item, "2.2rem")}</span>
          <div class="archive-card-info">
            <span class="archive-card-title">${recipe.name} 제작법</span>
            <span class="archive-card-desc" style="color:#2ecc71;">조합법: ${costNames.join(", ")}</span>
          </div>
        `;
      } else {
        card.innerHTML = `
          <span class="archive-card-icon">❓</span>
          <div class="archive-card-info">
            <span class="archive-card-title" style="color:var(--color-text-sub);">미해금 도안</span>
            <span class="archive-card-desc">기지 행동 '생각하기'를 장착 일지를 통해 수행하여 제작법을 해금하십시오.</span>
          </div>
        `;
      }
      grid.appendChild(card);
    }
    listEl.appendChild(grid);
  }
  else if (tabName === "creatures") {
    // 생물(펫 & 적) 도감 렌더링
    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.gap = "14px";
    
    // 펫 섹션
    const petTitle = document.createElement("div");
    petTitle.innerHTML = `<h4 style="color:var(--color-accent); font-size:0.85rem; border-bottom:1px solid var(--border-glass); padding-bottom:4px; margin-bottom:8px;">🐾 동료 동물 조련 도감</h4>`;
    container.appendChild(petTitle);
    
    const petGrid = document.createElement("div");
    petGrid.className = "archive-grid";
    
    const petStats = {
      husky: { name: "에스키모 허스키", avatar: "🐺", desc: "썰매를 끄는 충직한 에스키모 개. 공격력 조절 및 버프 보유." },
      arctic_fox: { name: "북극여우", avatar: "🦊", desc: "빛나는 털을 지닌 작고 영리한 여우. 치유 고유 스킬을 구사합니다." },
      snow_owl: { name: "눈올빼미", avatar: "🦉", desc: "어둠 속에서도 길을 잃지 않는 지혜로운 새. 적을 1턴간 기절시킵니다." },
      reindeer: { name: "순록", avatar: "🦌", desc: "단단한 뿔로 바람을 견디는 순록. 플레이어를 감싸는 방어벽 결계를 형성합니다." },
      seal: { name: "아기 바다표범", avatar: "🦭", desc: "생존자 곁에서 재롱을 떨며 정신을 맑게 다스려 주는 힐링 표범." },
      polar_bear: { name: "북극곰 동반자", avatar: "🐻‍❄️", desc: "길들이기 가장 맹렬히 까다로운 최강의 육식 야수. 압도적 괴력을 선사합니다." }
    };
    
    for (const [petId, info] of Object.entries(petStats)) {
      const isDiscovered = state.discoveredPets.includes(petId);
      const card = document.createElement("div");
      card.className = `archive-item-card ${isDiscovered ? "" : "locked"}`;
      
      if (isDiscovered) {
        card.innerHTML = `
          <span class="archive-card-icon">${info.avatar}</span>
          <div class="archive-card-info">
            <span class="archive-card-title">${info.name}</span>
            <span class="archive-card-desc">${info.desc}</span>
          </div>
        `;
      } else {
        card.innerHTML = `
          <span class="archive-card-icon">❓</span>
          <div class="archive-card-info">
            <span class="archive-card-title" style="color:var(--color-text-sub);">미발견 동물</span>
            <span class="archive-card-desc">탐험 도중 야생 동물을 조우하여 생고기로 길들여 보십시오.</span>
          </div>
        `;
      }
      petGrid.appendChild(card);
    }
    container.appendChild(petGrid);
    
    // 몬스터(적) 섹션
    const monsterTitle = document.createElement("div");
    monsterTitle.innerHTML = `<h4 style="color:var(--color-danger); font-size:0.85rem; border-bottom:1px solid var(--border-glass); padding-bottom:4px; margin-top:10px; margin-bottom:8px;">👾 극지 괴수 및 위협 도감</h4>`;
    container.appendChild(monsterTitle);
    
    const monsterGrid = document.createElement("div");
    monsterGrid.className = "archive-grid";
    
    for (const [mId, mInfo] of Object.entries(MONSTER_DATABASE)) {
      const isDiscovered = state.discoveredMonsters.includes(mId);
      const card = document.createElement("div");
      card.className = `archive-item-card ${isDiscovered ? "" : "locked"}`;
      
      if (isDiscovered) {
        card.innerHTML = `
          <span class="archive-card-icon">${mInfo.icon}</span>
          <div class="archive-card-info">
            <span class="archive-card-title">${mInfo.name}</span>
            <span class="archive-card-desc">${mInfo.desc}</span>
          </div>
        `;
      } else {
        card.innerHTML = `
          <span class="archive-card-icon">❓</span>
          <div class="archive-card-info">
            <span class="archive-card-title" style="color:var(--color-text-sub);">미발견 괴수</span>
            <span class="archive-card-desc">생존 일수가 오래 흐르거나 위험 탐색 시 습격을 받아 만날 수 있습니다.</span>
          </div>
        `;
      }
      monsterGrid.appendChild(card);
    }
    container.appendChild(monsterGrid);
    
    listEl.appendChild(container);
  }
}

// 7. 아카이브 모달 토글
function showArchiveModal() {
  const modal = document.getElementById("archive-modal");
  if (modal) {
    // 렌더링 전 현 세이브 도감 연동 동기화 일괄 보정
    syncDiscoveries();
    
    renderArchive("achievements");
    modal.classList.remove("hidden");
  }
}

function closeArchiveModal() {
  const modal = document.getElementById("archive-modal");
  if (modal) {
    modal.classList.add("hidden");
  }
}

// 8. 백업 (.js 세이브 내보내기)
function exportEncryptedSave() {
  try {
    // 최신 상태를 강제 동기화 후 암호화 수행
    syncDiscoveries();
    checkAchievements();
    
    const rawData = JSON.stringify(state);
    const encrypted = encryptData(rawData);
    
    const jsContent = `/**
 * Frostbite: Polar Survival Encrypted Save File
 * Do not edit this file manually.
 */
window.FROSTBITE_SAVE_DATA = "${encrypted}";
`;
    
    const blob = new Blob([jsContent], { type: "application/javascript" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `frostbite_save_day_${state.day}.js`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showToast("암호화 세이브 파일(.js) 백업 다운로드를 시작합니다.", "success");
  } catch (err) {
    console.error("세이브 내보내기 예외:", err);
    showToast("세이브 파일을 암호화 내보내기 하는 도중 실패했습니다.", "error");
  }
}

// 9. 복구 (.js 세이브 가져오기)
function triggerImportFileInput() {
  const fileInput = document.getElementById("save-file-input");
  if (fileInput) {
    fileInput.click();
  }
}

// 10. 독립적 이벤트 리스너 바인딩 (onload 시점)
window.addEventListener("load", () => {
  // 모달 제어 이벤트 바인딩
  const btnHeaderArchive = document.getElementById("archive-btn");
  const btnStartArchive = document.getElementById("start-archive-btn");
  const btnCloseArchive = document.getElementById("archive-close-btn");
  const btnCloseXArchive = document.getElementById("archive-modal-close-x");
  
  if (btnHeaderArchive) btnHeaderArchive.addEventListener("click", showArchiveModal);
  if (btnStartArchive) btnStartArchive.addEventListener("click", showArchiveModal);
  if (btnCloseArchive) btnCloseArchive.addEventListener("click", closeArchiveModal);
  if (btnCloseXArchive) btnCloseXArchive.addEventListener("click", closeArchiveModal);
  
  // 탭 제어 바인딩
  const tabBtns = document.querySelectorAll(".archive-tab-btn");
  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      renderArchive(btn.dataset.tab);
    });
  });
  
  // 백업 / 복구 버튼 바인딩
  const btnExport = document.getElementById("export-save-btn");
  const btnImport = document.getElementById("import-save-btn");
  const btnStartImport = document.getElementById("start-import-btn");
  const fileInput = document.getElementById("save-file-input");
  
  if (btnExport) btnExport.addEventListener("click", exportEncryptedSave);
  if (btnImport) btnImport.addEventListener("click", triggerImportFileInput);
  if (btnStartImport) btnStartImport.addEventListener("click", triggerImportFileInput);
  
  if (fileInput) {
    fileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = (evt) => {
        const text = evt.target.result;
        // window.FROSTBITE_SAVE_DATA = "값"; 형태 추출 정규식
        const match = text.match(/window\.FROSTBITE_SAVE_DATA\s*=\s*"(.*)"/);
        if (!match) {
          showToast("유효한 극지 생존(.js) 암호화 세이브 백업 파일이 아닙니다.", "error");
          return;
        }
        
        try {
          const decrypted = decryptData(match[1]);
          const loadedState = JSON.parse(decrypted);
          
          if (loadedState.day === undefined || loadedState.health === undefined) {
            throw new Error("Missing state property");
          }
          
          state = loadedState;
          
          // 도감 및 누적 데이터 안전 보정
          syncDiscoveries();
          checkAchievements();
          
          saveGame();
          updateUI();
          
          showToast(`생존 기록을 복구했습니다! (진행도: ${state.day}일차)`, "success");
          
          // 게임이 이미 진행 중인 상태인 경우 모달을 치우고 인게임 화면 강제 활성화
          if (state.gameStarted && !state.gameOver) {
            DOM.startScreen.classList.remove("active");
            DOM.gameScreen.classList.add("active");
            DOM.endScreen.classList.remove("active");
            DOM.combatScreen.classList.remove("active");
          }
        } catch (err) {
          console.error("복구 파싱 예외:", err);
          showToast("암호화 세이브 데이터를 해석하여 불러오는 데 실패했습니다. 파일이 손상되었을 수 있습니다.", "error");
        }
      };
      reader.readAsText(file);
      // 파일 입력 리셋으로 연속 로딩 가능케 함
      fileInput.value = "";
    });
  }

  // Safe Area 초기화 호출
  initSafeArea();
});

// --- 화면 비율 및 Safe Area 조정 로직 ---
let safeArea = { top: 0, bottom: 0, left: 0, right: 0 };
let tempSafeArea = { top: 0, bottom: 0, left: 0, right: 0 };

function initSafeArea() {
  // 로컬 스토리지 데이터 로드
  const saved = localStorage.getItem("frostbite_safe_area");
  if (saved) {
    try {
      safeArea = JSON.parse(saved);
    } catch(e) {
      console.error("Safe area 로드 실패:", e);
    }
  }
  applySafeArea(safeArea);
  
  // 설정 관련 버튼 리스너 바인딩
  if (DOM.startSettingsBtn) {
    DOM.startSettingsBtn.addEventListener("click", openSettingsModal);
  }
  if (DOM.settingsBtn) {
    DOM.settingsBtn.addEventListener("click", openSettingsModal);
  }
  if (DOM.settingsCloseBtn) {
    DOM.settingsCloseBtn.addEventListener("click", closeSettingsModal);
  }
  if (DOM.settingsModal) {
    DOM.settingsModal.addEventListener("click", (e) => {
      if (e.target === DOM.settingsModal) closeSettingsModal();
    });
  }
  if (DOM.adjustRatioBtn) {
    DOM.adjustRatioBtn.addEventListener("click", startSafeAreaAdjust);
  }
  if (DOM.adjusterConfirmBtn) {
    DOM.adjusterConfirmBtn.addEventListener("click", confirmSafeAreaAdjust);
  }
  if (DOM.adjusterResetBtn) {
    DOM.adjusterResetBtn.addEventListener("click", resetSafeAreaAdjust);
  }
  if (DOM.adjusterCancelBtn) {
    DOM.adjusterCancelBtn.addEventListener("click", cancelSafeAreaAdjust);
  }

  // 드래그 핸들 이벤트 바인딩
  bindSafeAreaDragEvents();

  // 조정 레이어 자체의 모바일 터치 스크롤 기본동작 방지
  if (DOM.safeAreaAdjuster) {
    DOM.safeAreaAdjuster.addEventListener("touchmove", (e) => {
      e.preventDefault();
    }, { passive: false });
  }
}

function applySafeArea(cfg) {
  // CSS 변수에 값 반영
  document.documentElement.style.setProperty("--safe-top", `${cfg.top}px`);
  document.documentElement.style.setProperty("--safe-bottom", `${cfg.bottom}px`);
  document.documentElement.style.setProperty("--safe-left", `${cfg.left}px`);
  document.documentElement.style.setProperty("--safe-right", `${cfg.right}px`);
}

function openSettingsModal() {
  if (DOM.settingsModal) {
    DOM.settingsModal.classList.remove("hidden");
  }
}

function closeSettingsModal() {
  if (DOM.settingsModal) {
    DOM.settingsModal.classList.add("hidden");
  }
}

function startSafeAreaAdjust() {
  closeSettingsModal();
  document.body.classList.add("adjusting-safe-area");
  window.scrollTo(0, 0);
  
  // 애초에 UI가 보이지 않아 조절이 불가능한 상황을 방지하기 위해,
  // 조정 화면에 들어가면 강제로 0.5 배율 크기 (상하좌우 25% 여백)에서 시작하게 합니다.
  tempSafeArea = {
    top: Math.floor(window.innerHeight * 0.25),
    bottom: Math.floor(window.innerHeight * 0.25),
    left: Math.floor(window.innerWidth * 0.25),
    right: Math.floor(window.innerWidth * 0.25)
  };
  
  applySafeArea(tempSafeArea);
  if (DOM.safeAreaAdjuster) {
    DOM.safeAreaAdjuster.classList.remove("hidden");
  }
}

function confirmSafeAreaAdjust() {
  safeArea = { ...tempSafeArea };
  localStorage.setItem("frostbite_safe_area", JSON.stringify(safeArea));
  applySafeArea(safeArea);
  document.body.classList.remove("adjusting-safe-area");
  if (DOM.safeAreaAdjuster) {
    DOM.safeAreaAdjuster.classList.add("hidden");
  }
  showToast("화면 비율 설정이 저장되었습니다.", "success");
}

function resetSafeAreaAdjust() {
  tempSafeArea = { top: 0, bottom: 0, left: 0, right: 0 };
  applySafeArea(tempSafeArea);
  showToast("여백 설정이 초기화되었습니다. 적용 완료를 누르셔야 반영됩니다.", "info");
}

function cancelSafeAreaAdjust() {
  applySafeArea(safeArea);
  document.body.classList.remove("adjusting-safe-area");
  if (DOM.safeAreaAdjuster) {
    DOM.safeAreaAdjuster.classList.add("hidden");
  }
  showToast("비율 조정을 취소했습니다.", "info");
}

function bindSafeAreaDragEvents() {
  const handles = document.querySelectorAll(".safe-handle");
  handles.forEach(handle => {
    const direction = handle.getAttribute("data-handle");
    
    const onStart = (e) => {
      e.preventDefault();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      
      const startX = clientX;
      const startY = clientY;
      const startVal = tempSafeArea[direction] || 0;
      
      const onMove = (moveEv) => {
        const moveClientX = moveEv.touches ? moveEv.touches[0].clientX : moveEv.clientX;
        const moveClientY = moveEv.touches ? moveEv.touches[0].clientY : moveEv.clientY;
        
        const dx = moveClientX - startX;
        const dy = moveClientY - startY;
        
        let newVal = startVal;
        
        if (direction === "top") {
          newVal = startVal + dy;
          const maxVal = window.innerHeight * 0.35;
          tempSafeArea.top = Math.max(0, Math.min(maxVal, newVal));
        } else if (direction === "bottom") {
          newVal = startVal - dy;
          const maxVal = window.innerHeight * 0.35;
          tempSafeArea.bottom = Math.max(0, Math.min(maxVal, newVal));
        } else if (direction === "left") {
          newVal = startVal + dx;
          const maxVal = window.innerWidth * 0.35;
          tempSafeArea.left = Math.max(0, Math.min(maxVal, newVal));
        } else if (direction === "right") {
          newVal = startVal - dx;
          const maxVal = window.innerWidth * 0.35;
          tempSafeArea.right = Math.max(0, Math.min(maxVal, newVal));
        }
        
        applySafeArea(tempSafeArea);
      };
      
      const onEnd = () => {
        document.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseup", onEnd);
        document.removeEventListener("touchmove", onMove);
        document.removeEventListener("touchend", onEnd);
      };
      
      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", onEnd);
      document.addEventListener("touchmove", onMove, { passive: false });
      document.addEventListener("touchend", onEnd);
    };
    
    handle.addEventListener("mousedown", onStart);
    handle.addEventListener("touchstart", onStart, { passive: false });
  });
}



