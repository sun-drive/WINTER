// Frostbite: 50가지 인게임 무작위 이벤트 목록

const survivalEvents = [
  {
    id: "ev_01",
    title: "눈보라의 엄습",
    description: "갑자기 하늘이 어두워지며 매서운 눈보라가 몰아칩니다. 체온이 급격하게 떨어지기 시작합니다. 대피할 곳을 찾아야 합니다.",
    options: [
      {
        text: "눈 구덩이를 파고 버틴다 (체온 -15, 체력 -10)",
        effect: { health: -10, warmth: -15, hunger: -5, sanity: -5 },
        resultText: "눈 속에 몸을 묻어 칼바람은 간신히 피했으나, 극심한 추위로 온몸이 얼어붙습니다."
      },
      {
        text: "간이 텐트를 설치하고 대피한다 (텐트 소모)",
        requiredItem: "tent",
        consumeItem: true,
        effect: { health: 10, warmth: 10, hunger: -5, sanity: 5 },
        resultText: "텐트를 설치하고 그 안에 대피하여 아늑하게 눈보라가 지나가길 기다립니다."
      },
      {
        text: "모닥불을 피워 추위를 쫓는다 (모닥불 소모)",
        requiredItem: "campfire",
        consumeItem: true,
        effect: { health: 5, warmth: 25, hunger: -5, sanity: 0 },
        resultText: "따뜻한 모닥불 주변에서 몸을 녹이며 추위를 버텨냅니다."
      }
    ]
  },
  {
    id: "ev_02",
    title: "굶주린 늑대와의 조우",
    description: "눈밭 위에서 붉은 눈빛을 반짝이며 굶주린 늑대 한 마리가 경계태세를 취하고 서서히 다가옵니다.",
    options: [
      {
        text: "맨손으로 맞서 싸운다 (체력 -25, 가죽 획득 확률)",
        effect: { health: -25, warmth: -5, hunger: -10, sanity: -15 },
        rewardItem: { id: "hide", qty: 1 },
        resultText: "치열하게 싸워 늑대를 쫓아냈지만 날카로운 이빨에 큰 상처를 입었고, 다행히 늑대의 가죽 일부를 뜯어냈습니다."
      },
      {
        text: "철제 창으로 늑대를 제압한다 (창 필요, 고기/가죽 획득)",
        requiredItem: "spear",
        consumeItem: false,
        effect: { health: -5, warmth: -5, hunger: -5, sanity: 5 },
        rewardItem: { id: "raw_meat", qty: 2 },
        resultText: "제작한 철제 창을 꼬나쥐고 늑대를 손쉽게 제압했습니다. 고기를 두둑이 챙겼습니다."
      },
      {
        text: "고기 한 덩이를 던져주고 후퇴한다 (생고기 소모)",
        requiredItem: "raw_meat",
        consumeItem: true,
        effect: { health: 0, warmth: -5, hunger: 0, sanity: 10 },
        resultText: "소중한 고기를 던져주자 늑대가 먹이에 정신을 파는 사이 안전한 곳으로 탈출했습니다."
      }
    ]
  },
  {
    id: "ev_03",
    title: "얼어붙은 사체 발견",
    description: "눈밭 한가운데 굳어버린 순록의 사체를 발견했습니다. 아직 야생동물이 뜯어먹지 않아 보존 상태가 양호합니다.",
    options: [
      {
        text: "칼로 유용한 자원을 채취한다 (고기/가죽 획득, 포만감 -10)",
        effect: { health: 0, warmth: -10, hunger: -10, sanity: -5 },
        rewardItem: { id: "raw_meat", qty: 2 },
        resultText: "순록의 사체에서 생고기와 두꺼운 가죽을 소량 채취해 배낭에 담았습니다."
      },
      {
        text: "사냥용 칼 대신 손으로 대충 뜯어낸다 (가죽 획득, 체력 -5)",
        effect: { health: -5, warmth: -15, hunger: -5, sanity: -10 },
        rewardItem: { id: "hide", qty: 1 },
        resultText: "맨손으로 가죽을 뜯어내느라 시간이 지체되었고 손가락에 가벼운 동상이 걸렸습니다."
      }
    ]
  },
  {
    id: "ev_04",
    title: "눈앞의 신기루, 백야 현상",
    description: "해가 지지 않는 극지의 밤, 지평선 너머로 묘한 빛의 장막이 펼쳐지며 신비로움과 동시에 고독감이 몰려옵니다.",
    options: [
      {
        text: "경치를 감상하며 마음을 다잡는다 (정신력 +15)",
        effect: { health: 0, warmth: -5, hunger: -5, sanity: 15 },
        resultText: "지평선의 장엄한 오로라를 바라보며 불안했던 마음이 눈 녹듯 편안해집니다."
      },
      {
        text: "빛을 무시하고 불을 지펴 몸을 누인다 (성냥 소모, 체온 +15)",
        requiredItem: "matches",
        consumeItem: true,
        effect: { health: 5, warmth: 15, hunger: -5, sanity: 5 },
        resultText: "아름다운 경치보다는 생존이 우선입니다. 불을 피워 몸을 따뜻하게 지켰습니다."
      }
    ]
  },
  {
    id: "ev_05",
    title: "버려진 기상 관측소",
    description: "눈더미 아래 반쯤 파묻힌 소형 관측소 컨테이너를 발견했습니다. 문이 굳게 닫혀 있습니다.",
    options: [
      {
        text: "힘으로 문을 부수고 들어간다 (체온 -10, 포만감 -15)",
        effect: { health: -5, warmth: -10, hunger: -15, sanity: -5 },
        rewardItem: { id: "metal", qty: 2 },
        resultText: "어깨로 문을 들이받아 억지로 개방했습니다. 내부에서 고철 조각들을 확보했습니다."
      },
      {
        text: "창문을 깨고 침입해 내부를 뒤진다 (도구 소모 없이 털기)",
        effect: { health: -10, warmth: -5, hunger: -5, sanity: -10 },
        rewardItem: { id: "cloth", qty: 2 },
        resultText: "창문을 깨다 유리에 베여 약간의 피를 흘렸지만, 방한에 쓸 수 있는 깨끗한 천 조각들을 얻었습니다."
      }
    ]
  },
  {
    id: "ev_06",
    title: "혹독한 동상",
    description: "손가락 끝이 감각을 잃고 보라색으로 변해가기 시작합니다. 동상 치료법을 빠르게 적용하지 않으면 위험합니다.",
    options: [
      {
        text: "따뜻하게 끓인 물을 마신다 (깨끗한 물 소모, 체온 +20)",
        requiredItem: "water",
        consumeItem: true,
        effect: { health: 15, warmth: 20, hunger: 5, sanity: 10 },
        resultText: "뜨거운 물을 마시며 손을 따뜻하게 녹이자 혈액순환이 돌아오며 감각이 돌아옵니다."
      },
      {
        text: "구급상자를 사용한다 (구급상자 소모, 체력 +30)",
        requiredItem: "medkit",
        consumeItem: true,
        effect: { health: 30, warmth: 10, hunger: 0, sanity: 15 },
        resultText: "연고를 바르고 붕대로 손가락을 단단히 고정해 통증을 완화시켰습니다."
      },
      {
        text: "그냥 주무르며 견딘다 (체력 -15)",
        effect: { health: -15, warmth: -5, hunger: -5, sanity: -15 },
        resultText: "동상 부위를 억지로 주무르다 피부 조직에 추가 손상이 일어났습니다. 극심한 통증이 밀려옵니다."
      }
    ]
  },
  {
    id: "ev_07",
    title: "설맹증 (Snow Blindness)",
    description: "눈 밭에 반사되는 강렬한 햇빛 때문에 눈이 시리고 앞이 제대로 보이지 않기 시작합니다.",
    options: [
      {
        text: "눈을 지그시 감고 그늘에서 휴식을 취한다 (정신력 -10, 체온 -10)",
        effect: { health: 0, warmth: -10, hunger: -5, sanity: -10 },
        resultText: "잠시 쉬었지만 불어오는 바람 때문에 몸만 더 얼어붙었습니다."
      },
      {
        text: "천 조각으로 눈을 가려 눈가리개를 만든다 (천 소모)",
        requiredItem: "cloth",
        consumeItem: true,
        effect: { health: 5, warmth: 0, hunger: 0, sanity: 10 },
        resultText: "천을 찢어 간이 안대를 만드니 눈의 피로도가 줄어들며 진정되었습니다."
      }
    ]
  },
  {
    id: "ev_08",
    title: "조난된 비행기 잔해",
    description: "설산 중턱에서 오래전에 추락한 소형 경비행기의 꼬리 날개 잔해를 발견했습니다. 화물칸이 멀쩡해 보입니다.",
    options: [
      {
        text: "내부를 조심스럽게 수색한다 (체온 -10)",
        effect: { health: 0, warmth: -10, hunger: -10, sanity: -5 },
        rewardItem: { id: "matches", qty: 2 },
        resultText: "내부를 뒤진 끝에 비상 생존 키트에 들어있던 성냥 몇 개를 손에 넣었습니다!"
      },
      {
        text: "비행기 외피의 철판을 뜯어낸다 (고철 획득)",
        effect: { health: -5, warmth: -15, hunger: -15, sanity: -5 },
        rewardItem: { id: "metal", qty: 3 },
        resultText: "차가운 알루미늄 외피를 강제로 뜯어내어 훌륭한 고철 자재들을 획득했습니다."
      }
    ]
  },
  {
    id: "ev_09",
    title: "빙판길의 낙상",
    description: "언덕을 내려가던 중 얼어붙은 빙판에 미끄러져 굴러떨어질 뻔했습니다. 간신히 나무뿌리를 잡았습니다.",
    options: [
      {
        text: "반동을 이용해 위로 올라온다 (포만감 -15)",
        effect: { health: -5, warmth: -5, hunger: -15, sanity: -5 },
        resultText: "기어 올라오는 데 엄청난 칼로리를 소모하여 배가 심하게 고파졌습니다."
      },
      {
        text: "잡고 있는 나뭇가지를 꺾으며 아래로 미끄러져 내려간다 (나뭇가지 획득)",
        effect: { health: -15, warmth: -5, hunger: -5, sanity: -10 },
        rewardItem: { id: "wood", qty: 3 },
        resultText: "미끄러져 엉덩방아를 찧으며 내려왔지만, 굴러떨어지는 와중에 마른 나뭇가지 몇 개를 꺾어 챙겼습니다."
      }
    ]
  },
  {
    id: "ev_10",
    title: "설산 멧돼지의 분노",
    description: "눈 속에서 칡넝쿨을 파먹고 있던 거대한 멧돼지와 마주쳤습니다. 멧돼지가 붉은 콧김을 뿜으며 돌진합니다.",
    options: [
      {
        text: "나무 뒤로 재빨리 피한다 (정신력 -10)",
        effect: { health: -5, warmth: -5, hunger: -10, sanity: -10 },
        resultText: "간발의 차로 나무 뒤로 굴렀지만, 멧돼지는 숲속으로 달아났고 뼈마디가 쑤십니다."
      },
      {
        text: "철제 창을 단단히 쥐고 찌른다 (창 소모 없이 맞서기)",
        requiredItem: "spear",
        consumeItem: false,
        effect: { health: -10, warmth: -10, hunger: -5, sanity: 15 },
        rewardItem: { id: "raw_meat", qty: 3 },
        resultText: "달려드는 멧돼지의 심장을 정확히 꿰뚫었습니다. 고기가 산더미처럼 생겼습니다."
      }
    ]
  },
  {
    id: "ev_11",
    title: "지독한 식중독",
    description: "갑자기 아랫배가 쥐어짜듯 아파 옵니다. 최근 먹었던 생고기나 오염된 물이 화근이었던 것 같습니다.",
    options: [
      {
        text: "구급상자의 해독제를 찾아 복용한다 (구급상자 소모)",
        requiredItem: "medkit",
        consumeItem: true,
        effect: { health: 15, warmth: 0, hunger: -10, sanity: 10 },
        resultText: "약상자 안에 든 비상 구토제와 소화제를 찾아 먹자 속이 편안해집니다."
      },
      {
        text: "깨끗한 물을 많이 마셔 독소를 씻어낸다 (깨끗한 물 소모)",
        requiredItem: "water",
        consumeItem: true,
        effect: { health: 5, warmth: 5, hunger: -10, sanity: 5 },
        resultText: "지속적으로 따뜻한 물을 들이켜 위장을 정화했습니다."
      },
      {
        text: "그냥 앓아눕는다 (체력 -20, 정신력 -15)",
        effect: { health: -20, warmth: -10, hunger: -15, sanity: -15 },
        resultText: "열이 나고 구토를 반복하며 기력이 바닥을 치기 시작합니다."
      }
    ]
  },
  {
    id: "ev_12",
    title: "약초 군락지 발견",
    description: "얼어붙은 바위 틈바구니 사이에서 극지의 추위를 견뎌내며 자란 희귀한 치료 약초들을 발견했습니다.",
    options: [
      {
        text: "약초를 정성껏 캡니다 (약초 획득)",
        effect: { health: 0, warmth: -10, hunger: -5, sanity: 5 },
        rewardItem: { id: "herb", qty: 3 },
        resultText: "상처 치료나 구급약 제작에 유용한 생명력 가득한 푸른 약초를 채집했습니다."
      },
      {
        text: "추위가 심해 그냥 빠르게 지나친다",
        effect: { health: 0, warmth: 5, hunger: 0, sanity: -5 },
        resultText: "약초 채집은 포기하고 서둘러 복귀했지만, 기회를 날린 것에 마음이 씁쓸합니다."
      }
    ]
  },
  {
    id: "ev_13",
    title: "눈 속의 철가방",
    description: "오래된 탐험대가 흘리고 간 것으로 보이는 잠긴 금속 케이스가 눈 속에 깊이 박혀 있습니다.",
    options: [
      {
        text: "돌멩이로 자물쇠를 사정없이 내리친다 (체력 -5, 포만감 -15)",
        effect: { health: -5, warmth: -10, hunger: -15, sanity: -5 },
        rewardItem: { id: "matches", qty: 1 },
        resultText: "몇 번이고 내리쳐 자물쇠를 부쉈습니다. 안에는 젖지 않은 성냥갑 하나가 덩그러니 들어있었습니다."
      },
      {
        text: "고철을 지렛대 삼아 틈을 벌려 연다 (고철 소모)",
        requiredItem: "metal",
        consumeItem: true,
        effect: { health: 0, warmth: -5, hunger: -5, sanity: 10 },
        rewardItem: { id: "medkit", qty: 1 },
        resultText: "철 조각을 쐐기처럼 박아 비틀어 열었습니다. 훌륭히 밀봉된 구급상자가 들어있습니다!"
      }
    ]
  },
  {
    id: "ev_14",
    title: "따뜻한 온천의 연기",
    description: "골짜기 틈 사이로 은은하게 유황 냄새가 섞인 온천 김이 솟아오르는 것을 목격했습니다.",
    options: [
      {
        text: "온천물에 몸을 잠시 담근다 (체온 +30, 체력 +15, 옷 젖음 주의)",
        effect: { health: 15, warmth: 30, hunger: -10, sanity: 20 },
        resultText: "따뜻한 물이 온몸의 피로를 사르르 녹여줍니다. 다만 젖은 옷을 입고 나오자 급격히 오한이 듭니다."
      },
      {
        text: "열기 근처에서 손만 쬐며 쉰다 (체온 +15, 정신력 +10)",
        effect: { health: 5, warmth: 15, hunger: -5, sanity: 10 },
        resultText: "온천 물에 들어가는 위험 대신 열기만 쬐며 쾌적하고 안전한 휴식을 취했습니다."
      }
    ]
  },
  {
    id: "ev_15",
    title: "설산 올빼미의 울음소리",
    description: "밤하늘에 부엉이 혹은 올빼미가 우는 소리가 울려 펴집니다. 야간에 홀로 남겨졌다는 두려움이 엄습합니다.",
    options: [
      {
        text: "하늘을 쳐다보며 고함을 질러 공포를 쫓는다 (정신력 -10)",
        effect: { health: 0, warmth: -5, hunger: -5, sanity: -10 },
        resultText: "고함을 질러봐도 차가운 메아리만 돌아올 뿐, 정신적인 허탈감이 더해집니다."
      },
      {
        text: "귀를 틀어막고 텐트 속에 머무른다 (텐트 필요, 정신력 +10)",
        requiredItem: "tent",
        consumeItem: false,
        effect: { health: 5, warmth: 10, hunger: 0, sanity: 10 },
        resultText: "텐트의 바람막이가 아늑한 벽이 되어 주어 공포감을 차단해 주었습니다."
      }
    ]
  },
  {
    id: "ev_16",
    title: "무너져 내리는 얼음 다리",
    description: "깊은 계곡 위를 잇고 있는 자연 얼음 다리 위에 섰을 때, 발밑에서 '쩌적' 하는 금이 가는 소리가 났습니다.",
    options: [
      {
        text: "뒤로 몸을 날려 탈출한다 (체온 -10)",
        effect: { health: -5, warmth: -10, hunger: -10, sanity: -5 },
        resultText: "필사적으로 뒤로 굴러 살았습니다. 얼음 다리는 골짜기 밑으로 요란한 소리를 내며 무너졌습니다."
      },
      {
        text: "앞을 향해 전속력으로 내달린다 (체력 -15, 건너편에서 자원 발견)",
        effect: { health: -15, warmth: -10, hunger: -15, sanity: -10 },
        rewardItem: { id: "wood", qty: 4 },
        resultText: "다리가 무너지며 아슬아슬하게 건너편으로 뛰어넘었습니다. 굴러떨어질 때 긁혀 피가 나지만 그곳에서 마른 나뭇가지를 대량 발견했습니다."
      }
    ]
  },
  {
    id: "ev_17",
    title: "추위를 녹여줄 커피 캔",
    description: "눈 더미 속에서 군용 비상 전투식량 팩의 잔해와 함께 뜯지 않은 알루미늄 인스턴트 커피 캔을 발견했습니다.",
    options: [
      {
        text: "그대로 뜯어 마신다 (포만감 +5, 정신력 +10)",
        effect: { health: 0, warmth: -5, hunger: 5, sanity: 10 },
        resultText: "차가운 액체지만 카페인 성분이 들어가 몸의 감각을 깨우고 기분을 전환해 줍니다."
      },
      {
        text: "불에 올려 데워 마신다 (성냥 소모, 온기 상승)",
        requiredItem: "matches",
        consumeItem: true,
        effect: { health: 5, warmth: 25, hunger: 10, sanity: 15 },
        resultText: "불을 지펴 캔을 뜨겁게 끓여 마시자 오장육부가 따뜻해지며 새로운 활력이 솟아납니다."
      }
    ]
  },
  {
    id: "ev_18",
    title: "설원의 버려진 캠핑장",
    description: "누군가 오래전 방치한 듯한 다 쓰러져가는 텐트 터를 찾았습니다. 여기저기 짐들이 흩어져 있습니다.",
    options: [
      {
        text: "텐트 가죽을 찢어 간직한다 (가죽 획득)",
        effect: { health: 0, warmth: -10, hunger: -5, sanity: -5 },
        rewardItem: { id: "hide", qty: 2 },
        resultText: "쓸만한 방한용 동물 가죽 부품들을 뜯어 배낭에 챙겼습니다."
      },
      {
        text: "난로의 연료 찌꺼기를 찾는다 (성냥 획득)",
        effect: { health: 0, warmth: -10, hunger: -5, sanity: -5 },
        rewardItem: { id: "matches", qty: 2 },
        resultText: "녹슨 등유통 바닥에서 방수 포장된 성냥갑을 기적적으로 찾아냈습니다."
      }
    ]
  },
  {
    id: "ev_19",
    title: "얼어붙은 강과 수면 밑 물고기",
    description: "두껍게 얼어붙은 강바닥 아래로 커다란 그림자들이 느리게 움직이는 모습이 비쳐 보입니다.",
    options: [
      {
        text: "돌로 얼음을 깨어 사냥을 시도한다 (체온 -15, 포만감 -20)",
        effect: { health: -5, warmth: -15, hunger: -20, sanity: -10 },
        resultText: "돌로 얼음을 두드리다 강바닥 얼음이 너무 두꺼워 힘만 빼고 손을 크게 다쳤습니다."
      },
      {
        text: "창으로 얼음 틈을 찍어 고기를 낚는다 (창 필요)",
        requiredItem: "spear",
        consumeItem: false,
        effect: { health: 0, warmth: -10, hunger: -10, sanity: 5 },
        rewardItem: { id: "fish", qty: 2 },
        resultText: "창 끝으로 얇은 얼음 결을 정확하게 파고들어 펄떡이는 물고기를 두 마리 낚았습니다."
      }
    ]
  },
  {
    id: "ev_20",
    title: "오로라의 신비한 광경",
    description: "하늘 전체가 형형색색의 휘황찬란한 오로라 장막으로 덮여 사방이 환하게 물듭니다.",
    options: [
      {
        text: "잠시 멍하니 앉아 경이로움을 만끽한다 (정신력 +25)",
        effect: { health: 5, warmth: -5, hunger: -5, sanity: 25 },
        resultText: "이 가혹한 자연에도 이런 아름다움이 존재함에 경외심을 느끼고, 살고자 하는 의지가 강해집니다."
      },
      {
        text: "주변이 밝아진 틈을 타 서둘러 장작을 모은다 (나뭇가지 획득)",
        effect: { health: -5, warmth: -15, hunger: -10, sanity: 5 },
        rewardItem: { id: "wood", qty: 5 },
        resultText: "감상은 사치입니다. 밝아진 시야 덕에 평소 보이지 않던 마른 장작들을 많이 주웠습니다."
      }
    ]
  },
  {
    id: "ev_21",
    title: "바람을 가르는 돌풍",
    description: "순간 시속 80km에 육박하는 강력한 극풍이 휘몰아치며 배낭에 매달아 두었던 장비들이 흔들립니다.",
    options: [
      {
        text: "바람에 날아간 물건을 잡으려 뛴다 (포만감 -15)",
        effect: { health: -10, warmth: -10, hunger: -15, sanity: -10 },
        resultText: "날아간 장비를 쫓다 찬 공기를 과하게 마셔 폐가 따갑고 넘어지기까지 했습니다."
      },
      {
        text: "가만히 엎드려 자세를 낮추고 참는다 (안전 제일)",
        effect: { health: 0, warmth: -15, hunger: -5, sanity: -5 },
        resultText: "눈 밭에 납작 엎드려 바람이 그치길 기다렸습니다. 비록 몸은 추워졌지만 더 이상의 상처는 피했습니다."
      }
    ]
  },
  {
    id: "ev_22",
    title: "혹한 속 잃어버린 식욕",
    description: "극한의 공포와 스트레스로 인해 위장이 굳어 음식을 먹는 것조차 거부감이 들며 신물이 올라옵니다.",
    options: [
      {
        text: "따뜻한 고기 수프를 억지로 요리해 먹는다 (구운 고기 소모)",
        requiredItem: "cooked_meat",
        consumeItem: true,
        effect: { health: 15, warmth: 20, hunger: 25, sanity: 15 },
        resultText: "조리된 고기를 끓여 수프로 마시니 위장이 안정되고 따뜻해지며 기운이 솟아납니다."
      },
      {
        text: "눈을 퍼먹어 수분을 보충한다 (눈 소모)",
        requiredItem: "snow",
        consumeItem: true,
        effect: { health: -10, warmth: -25, hunger: 5, sanity: -10 },
        resultText: "차가운 생눈을 삼키자 속이 뒤틀리고 극심한 오한이 들며 스탯이 급감합니다."
      }
    ]
  },
  {
    id: "ev_23",
    title: "눈사태의 경고음",
    description: "멀리서 '쿵쾅'하는 둔탁한 진동과 함께 대규모 눈사태가 계곡 측면을 타고 쏟아지는 소리가 납니다.",
    options: [
      {
        text: "안전한 바위 그늘 아래로 대피해 숨는다 (정신력 -10)",
        effect: { health: 0, warmth: -10, hunger: -5, sanity: -10 },
        resultText: "눈보라 덩어리가 사방으로 튀며 몸을 덮쳤지만 튼튼한 바위벽 덕분에 매몰되는 참사는 막았습니다."
      },
      {
        text: "비명 지르며 탈출로를 찾아 달린다 (체력 -15, 체온 -10)",
        effect: { health: -15, warmth: -10, hunger: -15, sanity: -15 },
        resultText: "이성을 잃고 질주하다 돌부리에 걸려 넘어졌습니다. 발목에 큰 충격을 입었습니다."
      }
    ]
  },
  {
    id: "ev_24",
    title: "부서진 탐사 썰매",
    description: "반쯤 얼어붙은 상태로 내버려진 철제 탐사 썰매의 뼈대를 발견했습니다.",
    options: [
      {
        text: "도구를 이용해 철제 프레임을 분해한다 (고철 획득)",
        effect: { health: -5, warmth: -10, hunger: -10, sanity: 0 },
        rewardItem: { id: "metal", qty: 3 },
        resultText: "튼튼한 고철 부속들을 몇 개 해체하여 나중에 칼이나 창의 재료로 쓸 수 있게 챙겼습니다."
      },
      {
        text: "그냥 스쳐 지나간다 (방관)",
        effect: { health: 0, warmth: 5, hunger: 0, sanity: 0 },
        resultText: "불필요한 힘을 낭비하지 않고 가던 길을 묵묵히 걸어 나갑니다."
      }
    ]
  },
  {
    id: "ev_25",
    title: "얼음 틈새 속 구급 물품",
    description: "깊고 푸른 빙하 크레바스(Crevasse) 틈 가장자리에 미끄러진 채 멈춰 서 있는 배낭이 보입니다. 까딱하면 떨어질 위치입니다.",
    options: [
      {
        text: "조심스럽게 손을 뻗어 배낭을 끌어올린다 (정신력 -15)",
        effect: { health: 0, warmth: -5, hunger: -5, sanity: -15 },
        rewardItem: { id: "bag_medium", qty: 1 },
        resultText: "심장이 덜컥 내려앉는 공포를 무릅쓰고 배낭을 통째로 무사히 끌어올렸습니다! 수납 효율이 매우 훌륭한 배낭을 장착 장비로 챙겼습니다."
      },
      {
        text: "위험을 감수하지 않고 발길을 돌린다 (정신력 +5)",
        effect: { health: 0, warmth: 0, hunger: 0, sanity: 5 },
        resultText: "안전이 최우선입니다. 욕심부리지 않은 자신에게 안도의 박수를 보냅니다."
      }
    ]
  },
  {
    id: "ev_26",
    title: "버려진 동굴 수색",
    description: "차가운 바람을 완벽하게 막아줄 만한 바위 동굴 입구를 발견했습니다.",
    options: [
      {
        text: "동굴 깊은 곳까지 조사한다 (나뭇가지 획득)",
        effect: { health: 0, warmth: -5, hunger: -10, sanity: -10 },
        rewardItem: { id: "wood", qty: 3 },
        resultText: "동굴 구석진 곳에서 예전에 사람들이 때다 남겨둔 건조한 땔감들을 모았습니다."
      },
      {
        text: "입구 근처에 텐트를 치고 쉰다 (텐트 소모)",
        requiredItem: "tent",
        consumeItem: true,
        effect: { health: 20, warmth: 20, hunger: 0, sanity: 15 },
        resultText: "동굴 입구라는 천연 장벽 덕에 더욱 완벽하게 보호받으며 깊은 숙면을 취했습니다."
      }
    ]
  },
  {
    id: "ev_27",
    title: "독 독나방의 유혹",
    description: "드물게 추운 겨울철에 빛을 발하는 극지 희귀 곤충이 눈 밭 위에서 희미한 인광을 발하고 있습니다.",
    options: [
      {
        text: "호기심에 곤충을 만져본다 (체력 -20, 신비함에 빠짐)",
        effect: { health: -20, warmth: 0, hunger: 0, sanity: 15 },
        resultText: "만지자마자 독 가루가 손에 닿아 살갗이 짓무르고 통증이 오지만, 빛의 환상에 정신은 묘하게 안정을 찾습니다."
      },
      {
        text: "발로 밟아 짓뭉개 버린다 (무정함)",
        effect: { health: 0, warmth: 0, hunger: 0, sanity: -5 },
        resultText: "쓸데없는 위협 요소를 원천 차단하고 차갑게 전진합니다."
      }
    ]
  },
  {
    id: "ev_28",
    title: "불을 붙일 수 없는 나무",
    description: "찾은 나뭇가지들이 수분을 듬뿍 머금어 젖어 있습니다. 이대로는 불을 피우기 어렵습니다.",
    options: [
      {
        text: "성냥을 여러 개 낭비하며 강제로 불을 피운다 (성냥 소모)",
        requiredItem: "matches",
        consumeItem: true,
        effect: { health: -5, warmth: 10, hunger: -5, sanity: -10 },
        resultText: "성냥갑 절반 이상을 소모하고 연기만 가득 차 눈물이 고이지만 힘겹게 약한 불씨를 얻었습니다."
      },
      {
        text: "품속에 품어 체온으로 나무를 말린다 (체온 -15)",
        effect: { health: -5, warmth: -15, hunger: -5, sanity: 5 },
        rewardItem: { id: "wood", qty: 2 },
        resultText: "자기 몸을 땔감 건조기로 썼습니다. 가벼운 한기를 얻는 대신 다음 번에 쓸 수 있는 말린 나뭇가지를 챙겼습니다."
      }
    ]
  },
  {
    id: "ev_29",
    title: "얼어붙은 통신 기지",
    description: "산 정상 부근에 거대한 위성 안테나와 조그마한 통신 중계실 건물 유적이 서 있습니다.",
    options: [
      {
        text: "전기 배선을 모조리 잘라낸다 (고철 획득)",
        effect: { health: -5, warmth: -10, hunger: -15, sanity: -5 },
        rewardItem: { id: "metal", qty: 3 },
        resultText: "구리선과 단단한 금속 패널을 대량 뜯어내 배낭에 고정했습니다."
      },
      {
        text: "중계실 소파의 천을 뜯는다 (천 획득)",
        effect: { health: 0, warmth: -10, hunger: -5, sanity: 5 },
        rewardItem: { id: "cloth", qty: 2 },
        resultText: "의자에 붙어있던 가죽과 보온용 천 시트를 뜯어 요긴하게 쓸 자재를 늘렸습니다."
      }
    ]
  },
  {
    id: "ev_30",
    title: "구조의 신호탄?",
    description: "멀리 동쪽 하늘에서 붉은빛의 조명탄이 쏘아 올려 졌다가 서서히 연기를 내며 떨어지는 광경을 보았습니다.",
    options: [
      {
        text: "그곳을 향해 미친 듯이 소리 지르며 뛰어간다 (포만감 -25, 체온 -15)",
        effect: { health: -10, warmth: -15, hunger: -25, sanity: -15 },
        resultText: "뛰어가 보았으나 눈 늪에 빠져 허우적대며 너무 멀어 기척조차 닿지 않았습니다. 허탈감에 눈물이 앞을 가립니다."
      },
      {
        text: "침착하게 내일 갈 경로를 지도에 표시해 둔다 (정신력 +15)",
        effect: { health: 5, warmth: 0, hunger: -5, sanity: 15 },
        resultText: "살아남아 있다면 내일이라도 닿을 수 있을 것입니다. 생존 의지가 강하게 타오릅니다."
      }
    ]
  },
  {
    id: "ev_31",
    title: "눈 밑의 구덩이 함정",
    description: "눈에 덮여 평평해 보였던 땅 아래가 갑자기 푹 꺼지며 몸이 아래로 처박힙니다. 오래전 파놓은 곰 덫 구덩이입니다.",
    options: [
      {
        text: "버둥거리며 기어 나온다 (체력 -15)",
        effect: { health: -15, warmth: -10, hunger: -10, sanity: -10 },
        resultText: "구덩이 안의 뾰족한 나뭇가지에 허벅지를 긁히며 필사적으로 탈출했습니다."
      },
      {
        text: "창으로 딛고 올라올 지지대를 마련해 짚고 일어난다 (창 필요)",
        requiredItem: "spear",
        consumeItem: false,
        effect: { health: -5, warmth: -5, hunger: -5, sanity: 5 },
        resultText: "철제 창을 눈 구덩이 단단한 측면에 박아 디딤돌 삼아 안전하게 탈출했습니다."
      }
    ]
  },
  {
    id: "ev_32",
    title: "얼어 죽은 등산가",
    description: "오래된 노란색 고기능 방한 점퍼를 입고 꽁꽁 언 채 앉아있는 시신을 보았습니다. 손에는 빈 플라스크 병이 쥐어져 있습니다.",
    options: [
      {
        text: "묵념을 올리고 조심스럽게 주머니를 뒤진다 (성냥 획득)",
        effect: { health: 0, warmth: -10, hunger: -5, sanity: -10 },
        rewardItem: { id: "matches", qty: 2 },
        resultText: "안쪽 주머니에서 방수 비닐에 소중히 보관된 미사용 성냥들을 얻을 수 있었습니다."
      },
      {
        text: "고인의 명복을 빌며 그대로 묻어준다 (정신력 +10)",
        effect: { health: 0, warmth: -15, hunger: -10, sanity: 10 },
        resultText: "차가운 눈으로 사체를 정성껏 덮어주었습니다. 고독의 무게가 다소 가벼워집니다."
      }
    ]
  },
  {
    id: "ev_33",
    title: "설산 토끼와의 조우",
    description: "새하얀 털을 가진 작고 귀여운 설산 토끼 한 마리가 숲 가장자리에서 귀를 쫑긋거리며 눈치를 보고 있습니다.",
    options: [
      {
        text: "돌멩이를 세게 집어던진다 (사냥 시도, 포만감 -5)",
        effect: { health: 0, warmth: -5, hunger: -5, sanity: -5 },
        resultText: "돌을 던졌으나 토끼는 잽싸게 풀숲으로 사라져 돌멩이만 허무하게 눈 속에 묻혔습니다."
      },
      {
        text: "철제 창을 투척해 사냥한다 (창 필요, 고기/가죽 획득)",
        requiredItem: "spear",
        consumeItem: false,
        effect: { health: 0, warmth: -5, hunger: -5, sanity: 5 },
        rewardItem: { id: "raw_meat", qty: 1 },
        resultText: "조용히 조준한 뒤 창을 던져 사냥에 성공했습니다! 작지만 부드러운 고기와 가죽을 얻었습니다."
      }
    ]
  },
  {
    id: "ev_34",
    title: "갑작스러운 화재 징후",
    description: "텐트 안에서 모닥불 잔해의 불씨가 튀어 가방 모퉁이가 타오르기 시작합니다!",
    options: [
      {
        text: "눈더미를 퍼부어 즉시 진화한다 (눈 소모)",
        requiredItem: "snow",
        consumeItem: true,
        effect: { health: 0, warmth: -10, hunger: 0, sanity: 5 },
        resultText: "녹인 눈물과 눈뭉치를 끼얹어 가방이 더 타는 것은 막았지만 물품이 젖어버렸습니다."
      },
      {
        text: "맨손으로 때려 불을 끈다 (체력 -15)",
        effect: { health: -15, warmth: 0, hunger: 0, sanity: -10 },
        resultText: "손바닥에 붉은 화상을 입으며 불씨를 껐습니다. 통증이 매우 심합니다."
      }
    ]
  },
  {
    id: "ev_35",
    title: "얼음 밑에서 솟아난 독가스",
    description: "늪지대 얼음이 갈라진 틈 사이로 가라앉아 있던 정체불명의 가스가 쉿 소리를 내며 분출됩니다.",
    options: [
      {
        text: "천 조각으로 입과 코를 막고 지나간다 (천 소모)",
        requiredItem: "cloth",
        consumeItem: true,
        effect: { health: 5, warmth: -5, hunger: -5, sanity: 5 },
        resultText: "천을 젖은 눈에 적셔 마스크처럼 감싸 유독가스를 흡입하지 않고 무사히 건넜습니다."
      },
      {
        text: "우회하여 크게 돌아간다 (체온 -15, 포만감 -20)",
        effect: { health: 0, warmth: -15, hunger: -20, sanity: 0 },
        resultText: "안전을 위해 수 킬로미터를 돌아서 가느라 에너지를 많이 소모했습니다."
      }
    ]
  },
  {
    id: "ev_36",
    title: "기온의 깜짝 급상승",
    description: "차갑게 몰아치던 서풍이 멈추고 드물게 따뜻한 남풍이 불어오며 낮 기온이 잠시 편안하게 올라갑니다.",
    options: [
      {
        text: "겉옷을 풀고 따스한 볕 아래 눕는다 (체력 +10, 체온 +20)",
        effect: { health: 10, warmth: 20, hunger: -5, sanity: 15 },
        resultText: "몸 전체의 긴장이 탁 풀리면서 그간 쌓인 생존의 스트레스가 다소 누그러집니다."
      },
      {
        text: "이 틈에 눈을 녹여 물로 잔뜩 만들어 둔다 (물 획득)",
        effect: { health: 0, warmth: 10, hunger: -5, sanity: 5 },
        rewardItem: { id: "water", qty: 2 },
        resultText: "얼어붙은 눈들이 부드러워져 쉽게 끓이고 녹여 양질의 깨끗한 물을 담았습니다."
      }
    ]
  },
  {
    id: "ev_37",
    title: "고장 난 설상 오토바이",
    description: "부품이 반쯤 적출된 버려진 스노모빌이 방치되어 있습니다. 엔진 부품이 튼튼해 보입니다.",
    options: [
      {
        text: "엔진 프레임과 철재 부품을 때려 부순다 (고철 획득)",
        effect: { health: -5, warmth: -10, hunger: -15, sanity: -5 },
        rewardItem: { id: "metal", qty: 3 },
        resultText: "체력을 소모해 때려부순 끝에 단단한 크롬강 스틸 조각들을 채취했습니다."
      },
      {
        text: "가죽 시트 가죽을 도려낸다 (가죽 획득)",
        effect: { health: 0, warmth: -5, hunger: -5, sanity: 5 },
        rewardItem: { id: "hide", qty: 2 },
        resultText: "부드럽게 마감 처리된 인조 시트 가죽을 획득하여 텐트나 옷감 수리에 유용할 것입니다."
      }
    ]
  },
  {
    id: "ev_38",
    title: "구더기가 끓지 않는 깨끗한 눈밭",
    description: "오염이 전혀 없는 신선하게 쌓인 완전무결한 백색의 눈 둔덕을 찾았습니다.",
    options: [
      {
        text: "눈을 긁어모아 깨끗한 통에 가득 채운다 (눈 획득)",
        effect: { health: 0, warmth: -10, hunger: -5, sanity: 5 },
        rewardItem: { id: "snow", qty: 3 },
        resultText: "추후 불을 피워 정수할 수 있는 좋은 식수 자원이 될 것입니다."
      },
      {
        text: "그냥 눈을 뭉쳐 눈사람을 만들며 논다 (정신력 +20)",
        effect: { health: 0, warmth: -15, hunger: -10, sanity: 20 },
        resultText: "비록 몸은 추워졌지만, 절망적인 극지 생활에서 잠시 어릴 적 동심으로 돌아가 행복감을 얻습니다."
      }
    ]
  },
  {
    id: "ev_39",
    title: "공포의 발자국소리",
    description: "안개가 짙게 낀 오후, 텐트 바깥에서 뽀드득... 뽀드득... 무거운 발걸음 소리가 반복해서 맴돕니다.",
    options: [
      {
        text: "창을 쥐고 비장하게 텐트 문을 연다 (창 필요, 조우)",
        requiredItem: "spear",
        consumeItem: false,
        effect: { health: 5, warmth: -5, hunger: -5, sanity: 15 },
        resultText: "밖으로 튀어나가자 커다란 순록 한 마리가 소리에 놀라 도망쳤습니다. 환상이 아니었음을 알고 안도합니다."
      },
      {
        text: "숨죽이고 숨을 참으며 나가지 않는다 (정신력 -15)",
        effect: { health: 0, warmth: 0, hunger: -5, sanity: -15 },
        resultText: "침묵 속에 언제 침입할지 모른다는 극심한 불안감이 엄습하여 영혼을 갉아먹습니다."
      }
    ]
  },
  {
    id: "ev_40",
    title: "버려진 통조림 발견",
    description: "추위 덕분에 썩지 않고 그대로 동결 보관된 수입 전투식량용 통조림 캔 하나를 찾았습니다.",
    options: [
      {
        text: "고철 조각으로 캔을 비틀어 따서 바로 먹는다 (포만감 +30)",
        effect: { health: 10, warmth: -5, hunger: 30, sanity: 10 },
        resultText: "딱딱하게 얼었지만 단백질 덩어리 기름진 콩과 고기 요리가 아주 훌륭한 만찬이 되어 줍니다."
      },
      {
        text: "모닥불에 올려 구워서 부드럽게 섭취한다 (모닥불 소모)",
        requiredItem: "campfire",
        consumeItem: true,
        effect: { health: 25, warmth: 25, hunger: 40, sanity: 20 },
        resultText: "김이 모락모락 나는 따뜻한 스튜로 만들어 먹었습니다. 최고의 진미입니다!"
      }
    ]
  },
  {
    id: "ev_41",
    title: "발가락의 마비 현상",
    description: "부츠 속으로 슬금슬금 눈 녹은 물이 스며들어 왼발의 감각이 얼어붙고 딱딱해졌습니다.",
    options: [
      {
        text: "구급상자의 붕대와 동상 연고를 바른다 (구급상자 소모)",
        requiredItem: "medkit",
        consumeItem: true,
        effect: { health: 20, warmth: 5, hunger: 0, sanity: 10 },
        resultText: "응급처치를 성실히 수행해 발가락 절단의 대참사를 간신히 모면했습니다."
      },
      {
        text: "더 젖기 전에 양말을 새 천으로 바꾼다 (천 소모)",
        requiredItem: "cloth",
        consumeItem: true,
        effect: { health: 10, warmth: 15, hunger: 0, sanity: 10 },
        resultText: "젖은 양말을 버리고 천을 기워 감싸니 발이 뽀송해지고 따뜻함이 살아납니다."
      },
      {
        text: "신경 쓰지 않고 걷는다 (체력 -20, 큰 부상)",
        effect: { health: -20, warmth: -10, hunger: -5, sanity: -15 },
        resultText: "발가락 피부 조직이 망가지면서 걸을 때마다 칼로 찌르는 듯한 염증성 통증이 생겼습니다."
      }
    ]
  },
  {
    id: "ev_42",
    title: "산사태로 드러난 바위벽",
    description: "무너져 내린 언덕 아래 단단한 검은 광석층이 밖으로 노출되어 있습니다.",
    options: [
      {
        text: "고철을 스틸 정 모양으로 써서 캐낸다 (부싯돌/고철 획득)",
        effect: { health: -10, warmth: -15, hunger: -15, sanity: -5 },
        rewardItem: { id: "metal", qty: 2 },
        resultText: "바위를 사정없이 쪼아내어 쓸만한 광물과 예리한 고철 날 재료를 캤습니다."
      },
      {
        text: "그냥 눈 바람이 피할 수 있게 바위벽 밑에 앉는다",
        effect: { health: 0, warmth: 10, hunger: -5, sanity: 5 },
        resultText: "바람막이 벽 삼아 가쁜 숨을 고르며 잠시 안전을 챙겼습니다."
      }
    ]
  },
  {
    id: "ev_43",
    title: "환각의 따스한 방",
    description: "극도의 피로 속에서 눈을 질끈 감았다 떴을 때, 저 앞에 벽난로가 타오르는 아늑한 고향 집의 거실이 보이는 듯합니다.",
    options: [
      {
        text: "정신을 차리기 위해 뺨을 강하게 때린다 (정신력 -10, 체력 -5)",
        effect: { health: -5, warmth: 0, hunger: 0, sanity: -10 },
        resultText: "짝 소리가 나게 자학하며 환각을 지웠지만 고통과 서러움이 북받쳐 오릅니다."
      },
      {
        text: "따뜻한 물을 마시며 심호흡을 한다 (깨끗한 물 소모)",
        requiredItem: "water",
        consumeItem: true,
        effect: { health: 5, warmth: 10, hunger: 0, sanity: 20 },
        resultText: "수분을 공급하며 호흡을 가다듬자 환각이 흩어지며 현실의 차가운 눈밭으로 돌아옵니다."
      }
    ]
  },
  {
    id: "ev_44",
    title: "극지 기지용 비상 보급함",
    description: "군데군데 붉은색 녹이 슬었지만 군용 비상 자물쇠가 달린 두꺼운 보급함이 반쯤 눈 밭에 잠겨 있습니다.",
    options: [
      {
        text: "창 끝으로 열쇠 뭉치를 부순다 (창 필요, 보급상자)",
        requiredItem: "spear",
        consumeItem: false,
        effect: { health: -5, warmth: -10, hunger: -10, sanity: 5 },
        rewardItem: { id: "medkit", qty: 1 },
        resultText: "단단한 창 끝을 찔러 지렛대처럼 젖혀 열어냈습니다! 내부에서 귀한 대형 구급상자를 확보했습니다."
      },
      {
        text: "맨손으로 돌을 던져 어떻게든 연다 (체력 -15)",
        effect: { health: -15, warmth: -15, hunger: -10, sanity: -10 },
        rewardItem: { id: "cloth", qty: 2 },
        resultText: "손을 크게 찧어가며 고군분투한 끝에 열었지만 천 조각 몇 장만이 남겨져 있었습니다."
      }
    ]
  },
  {
    id: "ev_45",
    title: "얼어붙은 새 둥지",
    description: "낮게 자란 극지 침엽수 가지 틈새에 알과 함께 꽁꽁 얼어 죽은 어미새의 둥지가 있습니다.",
    options: [
      {
        text: "알과 새 사체를 가져가 요리한다 (새알 및 고기 획득)",
        effect: { health: 0, warmth: -10, hunger: -5, sanity: -5 },
        rewardItems: [{ id: "raw_meat", qty: 1 }, { id: "egg", qty: 2 }],
        resultText: "가혹한 극지의 현실을 인지하며 식재료로 쓸 조류 사체와 알을 배낭에 거둡니다."
      },
      {
        text: "나무 아래 조용히 떨어뜨려 묻어준다 (자비)",
        effect: { health: 0, warmth: -10, hunger: -5, sanity: 15 },
        resultText: "작은 생명의 죽음에 조의를 표합니다. 마음 한구석의 도덕성이 회복됩니다."
      }
    ]
  },
  {
    id: "ev_46",
    title: "동굴 속 잠자는 북극곰의 흔적",
    description: "지나가던 동굴 벽면에 아주 거대한 발자국과 곰 털이 묻어있고 깊은 코골이 진동이 동굴 속에서 울려 나옵니다.",
    options: [
      {
        text: "소리를 내지 않고 까치발로 뒤걸음질 친다 (정신력 -10)",
        effect: { health: 0, warmth: -5, hunger: -5, sanity: -10 },
        resultText: "극한의 긴장감 속에서 땀을 쥐며 빠져나왔습니다. 하마터면 곰의 아침 식사가 될 뻔했습니다."
      },
      {
        text: "철제 창을 움켜쥐고 습격을 감행한다 (창 필요, 하이리스크)",
        requiredItem: "spear",
        consumeItem: false,
        effect: { health: -40, warmth: -15, hunger: -20, sanity: 20 },
        rewardItem: { id: "hide", qty: 4 },
        resultText: "미친 짓이었습니다! 북극곰의 앞발에 얻어맞아 늑골이 부러지고 사경을 헤맸으나, 필사의 일격으로 곰을 잡았습니다. 어마어마한 양의 모피 가죽을 얻었습니다."
      }
    ]
  },
  {
    id: "ev_47",
    title: "버려진 등대와 등대지기 오두막",
    description: "해안가 절벽 끝에 가동이 멈춘 어두운 석조 등대와 오두막이 희미하게 모습을 드러냅니다.",
    options: [
      {
        text: "오두막 내부 침대에서 휴식을 취한다 (체온 +15, 체력 +15)",
        effect: { health: 15, warmth: 15, hunger: -5, sanity: 10 },
        resultText: "낡은 등대지기용 깃털 침대에 누워 오랜만에 바람 소리를 잊고 안전하게 자고 일어났습니다."
      },
      {
        text: "등대 반사경실의 부품을 해체한다 (고철 획득)",
        effect: { health: -5, warmth: -10, hunger: -10, sanity: 5 },
        rewardItem: { id: "metal", qty: 3 },
        resultText: "부서진 구리 반사판 및 두꺼운 금속 기어들을 뜯어 훌륭한 고철 재료로 챙겼습니다."
      }
    ]
  },
  {
    id: "ev_48",
    title: "고열과 감기 기운",
    description: "밤새 차가운 바람을 맞은 탓인지 머리가 깨질 듯 아프고 온몸의 뼈마디가 마디마디 쑤셔옵니다. 심한 열병의 징후입니다.",
    options: [
      {
        text: "약초를 씹어 삼키며 버틴다 (약초 소모)",
        requiredItem: "herb",
        consumeItem: true,
        effect: { health: 15, warmth: 5, hunger: -5, sanity: 10 },
        resultText: "쓴 약초의 성분이 온몸에 퍼지며 다행히 이마의 열이 조금 내리는 듯합니다."
      },
      {
        text: "구급상자를 전량 사용한다 (구급상자 소모)",
        requiredItem: "medkit",
        consumeItem: true,
        effect: { health: 35, warmth: 10, hunger: 0, sanity: 15 },
        resultText: "항생제와 해열제를 정량 복용하고 깨끗하게 붕대를 갈아 씌우자 컨디션이 빠르게 회복됩니다."
      },
      {
        text: "뜨거운 물을 마시고 누워 있는다 (깨끗한 물 소모)",
        requiredItem: "water",
        consumeItem: true,
        effect: { health: 5, warmth: 15, hunger: -10, sanity: 5 },
        resultText: "뜨거운 물을 한 잔 마셔 이불을 쓰고 땀을 내며 열이 빠져나가길 조용히 기다렸습니다."
      }
    ]
  },
  {
    id: "ev_49",
    title: "얼어붙은 우편 배달부의 가방",
    description: "수십 년 전에 이곳을 헤매다 사망한 듯한 우체부의 사체 옆에 반쯤 묻힌 가방이 있습니다. 가방끈이 질겨 보입니다.",
    options: [
      {
        text: "가죽 가방을 칼로 도려내어 챙긴다 (가죽 배낭 획득)",
        effect: { health: 0, warmth: -10, hunger: -5, sanity: -5 },
        rewardItem: { id: "bag_small", qty: 1 },
        resultText: "우체부의 얼어붙은 몸에서 훼손되지 않은 가죽 가방 자체를 조심스럽게 회수하여 배낭 장비로 챙겼습니다."
      },
      {
        text: "편지 뭉치들을 모아 불쏘시개로 쓴다 (성냥 소모, 온기)",
        requiredItem: "matches",
        consumeItem: true,
        effect: { health: 5, warmth: 20, hunger: -5, sanity: 0 },
        resultText: "오래된 연애 편지와 행정 우편 뭉치들을 불태워 따뜻한 한때를 보냈습니다."
      }
    ]
  },
  {
    id: "ev_50",
    title: "북극의 기적이 눈앞에 (구조선 발견!)",
    description: "멀리 바다 저편에서 짙은 기적 소리와 함께 두꺼운 얼음을 깨며 다가오는 해안경비대 쇄빙선 구조선을 포착했습니다! 마지막 기회입니다!",
    options: [
      {
        text: "신호탄을 쏘아 올려 구조 요청을 보낸다 (성냥 소모)",
        requiredItem: "matches",
        consumeItem: true,
        effect: { health: 100, warmth: 100, hunger: 100, sanity: 100 },
        triggerEscape: true,
        resultText: "성냥 불꽃을 나뭇가지 무더기에 붙여 거대한 검은 연기 신호를 올렸습니다. 구조선에서 저희의 위치를 파악하고 헬기를 발진시켰습니다! 당신은 마침내 살아남았습니다!"
      },
      {
        text: "쇄빙선이 가까이 다가올 때까지 기다리며 모닥불을 피운다 (모닥불 소모)",
        requiredItem: "campfire",
        consumeItem: true,
        effect: { health: 100, warmth: 100, hunger: 100, sanity: 100 },
        triggerEscape: true,
        resultText: "모닥불을 환하게 피워 올렸습니다. 쇄빙선 서치라이트가 이쪽을 비추더니 구명보트를 하강시킵니다. 살았습니다!"
      },
      {
        text: "신호 수단이 없어 절규하며 바라만 본다 (신호 실패)",
        effect: { health: -10, warmth: -10, hunger: -10, sanity: -50 },
        resultText: "아무런 신호용 도구도, 성냥도 없었습니다. 구조선은 멀리 지나쳐 버렸고 당신은 끔찍한 실망감에 정신을 거의 잃었습니다."
      }
    ]
  },
  
  // ==========================================
  // 이로운 이벤트 25종 (ev_51 ~ ev_75)
  // ==========================================
  {
    id: "ev_51",
    title: "맑게 갠 아침 햇살",
    description: "눈보라가 물러가고 따스한 햇빛이 눈 밭을 비춥니다. 마음과 몸이 모두 녹아내립니다.",
    options: [
      {
        text: "기지개 켜며 일광욕을 즐긴다 (체온 +15, 정신력 +15)",
        effect: { warmth: 15, sanity: 15 },
        resultText: "차갑게 언 몸 구석구석 햇살의 온기가 퍼져나갑니다."
      }
    ]
  },
  {
    id: "ev_52",
    title: "눈더미 아래 가죽 파우치",
    description: "눈 더미에 반쯤 파묻힌 채 꽁꽁 얼어붙은 튼튼한 짐승 가죽 파우치를 발견했습니다.",
    options: [
      {
        text: "가죽 파우치 가방을 가져간다 (가죽 보따리 가방 획득)",
        rewardItem: { id: "bag_small", qty: 1 },
        resultText: "파우치 내에 담겨있던 내용물은 물론, 튼튼하게 제봉된 가죽 보따리 가방 자체를 무사히 손에 넣었습니다."
      }
    ]
  },
  {
    id: "ev_53",
    title: "얼지 않은 지하수 웅덩이",
    description: "바위 틈새 온기로 인해 얼지 않고 솟아나 흘러내리는 맑고 신선한 극지 식수 웅덩이를 발견했습니다.",
    options: [
      {
        text: "물병 가득 식수를 담는다 (물 2개 획득)",
        rewardItem: { id: "water", qty: 2 },
        resultText: "투명하고 안전하게 정수된 맑은 물 2통을 담아 확보했습니다."
      }
    ]
  },
  {
    id: "ev_54",
    title: "화석화된 석탄 연료 상자",
    description: "옛 탄광 탐사대가 폐기한 듯한 튼튼하게 잠겨 방치된 대용량 석탄 자재 나무궤짝이 보입니다.",
    options: [
      {
        text: "석탄을 꺼낸다 (석탄 3개 획득)",
        rewardItem: { id: "coal", qty: 3 },
        resultText: "화력이 매우 강하고 오래 타서 생존에 아주 유용한 석탄 조각 3개를 챙겼습니다."
      }
    ]
  },
  {
    id: "ev_55",
    title: "추락한 썰매의 구리 배선",
    description: "수십 년 전에 방치된 썰매 프레임 틈에서 노랗게 녹슬지 않은 구리선 다발을 발견했습니다.",
    options: [
      {
        text: "배선을 뜯어 챙긴다 (구리선 3개 획득)",
        rewardItem: { id: "wire", qty: 3 },
        resultText: "피복을 정리하여 요긴하게 쓸 도구용 구리 철사 3묶음을 확보했습니다."
      }
    ]
  },
  {
    id: "ev_56",
    title: "조난 생존자의 간이 캠프터",
    description: "최근에 누군가 묵었던 듯한 조그마한 야영지 잔해가 보입니다. 불씨는 꺼졌으나 쓸만한 장작이 흩어져 있습니다.",
    options: [
      {
        text: "주변을 수색한다 (장작 2개, 성냥 1개 획득)",
        rewardItem: { id: "wood", qty: 2 },
        effect: { sanity: 5 },
        resultText: "안전하게 건조된 장작들과 성냥갑을 찾아 보충했습니다."
      }
    ]
  },
  {
    id: "ev_57",
    title: "새하얀 눈올빼미의 둥지터",
    description: "나무 꼭대기 가지에 비어있는 거대한 올빼미 둥지가 보입니다. 둥지 바닥에 부드러운 깃털들이 수북합니다.",
    options: [
      {
        text: "깃털을 긁어모은다 (깃털 4개 획득)",
        rewardItem: { id: "feather", qty: 4 },
        resultText: "방한 자재로 쓰기 훌륭하고 가벼운 솜깃털 4개를 털어 배낭에 얹었습니다."
      }
    ]
  },
  {
    id: "ev_58",
    title: "얼음 동굴의 생명력, 약초밭",
    description: "지열이 뿜어져 나오는 어두운 동굴 틈바구니 사이로 생명력 넘치는 치료용 약초 무리가 자라나 있습니다.",
    options: [
      {
        text: "약초를 뿌리째 수확한다 (약초 2개 획득)",
        rewardItem: { id: "herb", qty: 2 },
        resultText: "상처 치료나 해독제로 가공할 수 있는 싱싱한 약초 2뿌리를 캐냈습니다."
      }
    ]
  },
  {
    id: "ev_59",
    title: "눈밭의 붉은 십자가 상자",
    description: "군용 수송 헬기 잔해물에서 튕겨 나온 것이 분명한 플라스틱 비상 구급상자가 눈더미에 누워있습니다.",
    options: [
      {
        text: "구급상자를 집어 든다 (구급상자 1개 획득)",
        rewardItem: { id: "medkit", qty: 1 },
        resultText: "포장이 단단히 밀봉되어 오염되지 않은 귀중한 대형 구급상자를 얻었습니다."
      }
    ]
  },
  {
    id: "ev_60",
    title: "등산 텐트의 잔해물",
    description: "폭설로 무너진 등산객 캠프에서 두껍고 인장강도가 질긴 끈과 프레임 나뭇대를 건졌습니다.",
    options: [
      {
        text: "장작과 힘줄 줄을 챙긴다 (나뭇가지 3개, 동물 힘줄 1개 획득)",
        rewardItem: { id: "wood", qty: 3 },
        resultText: "도구나 텐트를 묶는 데 쓸 튼튼한 동물 힘줄 질긴 끈과 땔감을 가져왔습니다."
      }
    ]
  },
  {
    id: "ev_61",
    title: "지열을 내뿜는 바위구멍",
    description: "화산암 지대 부근인지 온천 증기와 훈훈한 열기가 피어오르는 안락한 바위 구덩이를 발견했습니다.",
    options: [
      {
        text: "열기 옆에 쪼그리고 앉아 쉰다 (체온 +25, 정신력 +10)",
        effect: { warmth: 25, sanity: 10 },
        resultText: "차가워졌던 손발과 신체 전반의 기능이 놀라운 훈풍에 회복됩니다."
      }
    ]
  },
  {
    id: "ev_62",
    title: "신기루 오로라의 속삭임",
    description: "하늘에 뜬 오로라 광막이 마치 부모님의 잔잔한 목소리처럼 보이며 마음이 치유됩니다.",
    options: [
      {
        text: "눈물을 훔치며 용기를 낸다 (정신력 +20, 체력 +5)",
        effect: { sanity: 20, health: 5 },
        resultText: "절망 속에서도 반드시 고향으로 살아 돌아가겠다는 강렬한 의지가 굳건해집니다."
      }
    ]
  },
  {
    id: "ev_63",
    title: "버려진 기상 드론의 잔해",
    description: "눈 덮인 고사목 꼭대기에 추락하여 부서진 고성능 기상 관측용 소형 드론 본체가 걸려 있습니다.",
    options: [
      {
        text: "회로 패널을 뜯어낸다 (고장난 회로 2개, 구리선 2개 획득)",
        rewardItem: { id: "scrap_circuit", qty: 2 },
        resultText: "가치 높은 전자 제어용 정밀 기판 부속과 은 전선을 채취했습니다."
      }
    ]
  },
  {
    id: "ev_64",
    title: "얼어 죽은 늑대의 가죽 사체",
    description: "혹독한 눈폭풍을 이기지 못하고 얼어 죽은 큰 늑대 사체를 수색합니다. 다행히 모피가 상하지 않았습니다.",
    options: [
      {
        text: "가죽과 인대를 잘라낸다 (가죽 1개, 동물 힘줄 2개 획득)",
        rewardItem: { id: "hide", qty: 1 },
        resultText: "가죽 코트 봉제 등에 귀하게 쓸 천연 가죽모피와 동물 질긴 인대 힘줄 줄을 얻었습니다."
      }
    ]
  },
  {
    id: "ev_65",
    title: "안전한 쉼터 동굴의 선물",
    description: "동굴 구석자리에 고대 광부들이 작업 후 버려둔 건조한 침전물 자루를 찾아 헤집어 봅니다.",
    options: [
      {
        text: "자루를 뒤집는다 (석탄 2개, 부싯돌 2개 획득)",
        rewardItem: { id: "coal", qty: 2 },
        resultText: "순식간에 화력을 지필 수 있는 부싯돌과 오래 타오르는 연탄용 석탄 조각들을 얻었습니다."
      }
    ]
  },
  {
    id: "ev_66",
    title: "은하수의 장엄한 파노라마",
    description: "짙은 어둠 속에 어떠한 대기 오염도 없이 은하수의 빛나는 띠가 지평선을 아름답게 가로지릅니다.",
    options: [
      {
        text: "아름다운 야경을 보며 마음을 정화한다 (정신력 +25)",
        effect: { sanity: 25 },
        resultText: "고립감과 추위에 의한 영혼의 절망 상처가 깨끗하게 치유받는 안락한 마음이 듭니다."
      }
    ]
  },
  {
    id: "ev_67",
    title: "조난 대피용 비상 쉘터함",
    description: "벽면에 단단히 고정된 옛 소방 대피용 철제 매립 상자를 열어젖혔습니다. 비상식량 팩이 들어있습니다.",
    options: [
      {
        text: "비상식량을 확보한다 (물 1개, 구운 고기 1개 획득)",
        rewardItem: { id: "water", qty: 1 },
        resultText: "진공 밀봉되어 맛이 보존된 고열량 고기 수제 팩과 깨끗한 물 한 병을 확보했습니다."
      }
    ]
  },
  {
    id: "ev_68",
    title: "눈을 피할 수 있는 바위 그늘",
    description: "세찬 칼바람을 완벽하게 굴절시켜 막아주는 거대한 아치형 천연 바위 틈 아래 자리를 잡았습니다.",
    options: [
      {
        text: "잠시 눈을 붙이며 누워 있는다 (체력 +15, 체온 +10, 정신력 +10)",
        effect: { health: 15, warmth: 10, sanity: 10 },
        resultText: "한동안 바람이 몸을 찌르는 공포에서 풀려나 안전하고 조용하게 근육의 긴장을 풀었습니다."
      }
    ]
  },
  {
    id: "ev_69",
    title: "통신 기지 중계 안테나의 박스",
    description: "무너진 중계 전주 바닥에서 철제 통신 장치 배전 제어함을 발견했습니다.",
    options: [
      {
        text: "회로 패널을 적출한다 (고장난 회로 3개 획득)",
        rewardItem: { id: "scrap_circuit", qty: 3 },
        resultText: "열선 코트나 스마트 장비 수리에 쓸 수 있는 구형 전자 기판 소자들을 대량 건졌습니다."
      }
    ]
  },
  {
    id: "ev_70",
    title: "방치된 벌목 캠프 장작더미",
    description: "과거 산림 가공용으로 나무들을 모아 벌목해 놓은 메마른 나무 더미가 고스란히 얼어있습니다.",
    options: [
      {
        text: "장작용 나무들을 채집한다 (나뭇가지 4개 획득)",
        rewardItem: { id: "wood", qty: 4 },
        resultText: "한동안 불을 때고 제작 레시피에 쓸 수 있는 단단하고 고른 장작들을 많이 주웠습니다."
      },
      {
        text: "나무 틈새에서 낡은 야생 발화 기술 책자를 읽는다 (마찰 발화 일지 획득)",
        rewardItem: { id: "journal_friction", qty: 1 },
        resultText: "벌목꾼이 남겨둔 야외 발화술 지식을 발견하여, 마찰로 불 피우기 기술을 생활 일지에 기록했습니다!"
      }
    ]
  },
  {
    id: "ev_71",
    title: "백야의 경이로운 에너지",
    description: "태양이 지평선에 머물며 밤새 옅은 광채를 유지하는 신비한 현상 덕에 어둠의 조급함이 사라집니다.",
    options: [
      {
        text: "빛의 신비를 만끽하며 걷는다 (정신력 +30)",
        effect: { sanity: 30 },
        resultText: "생존할 수 있다는 긍정적인 신체적 기류와 정신이 고조되는 감정을 느낍니다."
      }
    ]
  },
  {
    id: "ev_72",
    title: "버려진 슬리핑 백 가방",
    description: "찢어진 극지 산악가용 매트리스 가방에서 방풍 가공된 양질의 내부 섬유 원단들이 뒹굽니다.",
    options: [
      {
        text: "가방 속 특수 보온 배낭을 회수한다 (발열 단열 배낭 획득)",
        rewardItem: { id: "bag_thermal", qty: 1 },
        resultText: "매트리스 속에 숨겨져 있던 보온 성능이 아주 훌륭한 특수 단열 배낭 장비를 무사히 건져냈습니다."
      }
    ]
  },
  {
    id: "ev_73",
    title: "얼어붙은 난파선 고철더미",
    description: "호숫가 모래사장에 반쯤 파묻힌 소형 난파 보트의 녹슨 스크루 프로펠러 부분을 파헤칩니다.",
    options: [
      {
        text: "쇠망치로 고철을 뜯어낸다 (고철 조각 4개 획득)",
        rewardItem: { id: "metal", qty: 4 },
        resultText: "도구 및 창촉 제작에 가장 많이 소요되는 튼튼한 고철 자재 4개를 모았습니다."
      }
    ]
  },
  {
    id: "ev_74",
    title: "방치된 가방 안의 가족 편지",
    description: "눈더미 아래 방치된 서류 가방 안에서 누군가 가족을 향해 쓴 애틋하고 따스한 손편지를 읽어 내려갑니다.",
    options: [
      {
        text: "편지의 사연에 위안을 삼는다 (정신력 +20)",
        effect: { sanity: 20 },
        resultText: "가족의 품이 떠오르고 살아서 문명 세계로 복귀하겠다는 간절한 소망이 더욱 샘솟습니다."
      }
    ]
  },
  {
    id: "ev_75",
    title: "눈더미 틈 깊은 유황 온천탕",
    description: "절벽 사이에 온천수가 마르지 않고 흐르며 물살을 내뿜는 천연 유황 사우나 실을 찾았습니다.",
    options: [
      {
        text: "열기에 몸을 기댄 채 쉰다 (체온 +35, 체력 +15)",
        effect: { warmth: 35, health: 15 },
        resultText: "뜨거운 수증기가 전신 모공을 열어주며 혹한기 피로를 대폭 해소하는 기적을 봅니다."
      }
    ]
  },

  // ==========================================
  // 전투 이벤트 10종 (ev_76 ~ ev_85)
  // ==========================================
  {
    id: "ev_76",
    type: "combat",
    title: "극지 무법 약탈자 출현!",
    description: "눈보라 너머로 누군가 당신을 향해 날카로운 도끼를 꼬나쥐고 괴성을 지르며 달려옵니다. 적대 생존자입니다!",
    monster: {
      id: "raider",
      name: "약탈자 생존자",
      hp: 80,
      maxHp: 80,
      atk: 14,
      def: 2,
      icon: "👤",
      rewards: [
        { id: "metal", qty: 2 },
        { id: "cloth", qty: 2 }
      ]
    }
  },
  {
    id: "ev_77",
    type: "combat",
    title: "설산 굶주린 들개떼의 포위",
    description: "새하얀 설원 저편에서 침을 흘리는 성질 포악한 야생 들개 두 마리가 이빨을 드러내며 포위해 옵니다.",
    monster: {
      id: "wild_dogs",
      name: "설산 들개떼",
      enemies: [
        { id: "corrupted_dog", name: "설산 굶주린 들개 A", hp: 35, maxHp: 35, atk: 8, def: 0, icon: "🐕", rewards: [{ id: "raw_meat", qty: 1 }] },
        { id: "corrupted_dog", name: "설산 굶주린 들개 B", hp: 35, maxHp: 35, atk: 8, def: 0, icon: "🐕", rewards: [{ id: "tendon", qty: 1 }] }
      ]
    }
  },
  {
    id: "ev_78",
    type: "combat",
    title: "돌연변이 거대 눈쥐의 급습",
    description: "기지 잔해를 뒤지던 중, 방사능에 오염되어 멧돼지만큼 거대해진 돌연변이 쥐 한 마리가 습격해 옵니다.",
    monster: {
      id: "giant_rat",
      name: "거대 눈쥐",
      hp: 50,
      maxHp: 50,
      atk: 10,
      def: 0,
      icon: "🐀",
      rewards: [
        { id: "raw_meat", qty: 1 },
        { id: "hide", qty: 1 }
      ]
    }
  },
  {
    id: "ev_79",
    type: "combat",
    title: "어두운 얼음굴 박쥐 무리",
    description: "동굴 안으로 발을 들이자 천장에 매달려 있던 예리한 발톱의 극지 흡혈 박쥐들이 파닥거리며 하강 엄습해 옵니다.",
    monster: {
      id: "cave_bats",
      name: "흡혈 박쥐떼",
      enemies: [
        { id: "cave_bat", name: "동굴 흡혈박쥐 A", hp: 20, maxHp: 20, atk: 6, def: 0, icon: "🦇", rewards: [{ id: "tendon", qty: 1 }] },
        { id: "cave_bat", name: "동굴 흡혈박쥐 B", hp: 20, maxHp: 20, atk: 6, def: 0, icon: "🦇", rewards: [{ id: "tendon", qty: 1 }] },
        { id: "cave_bat", name: "동굴 흡혈박쥐 C", hp: 20, maxHp: 20, atk: 6, def: 0, icon: "🦇", rewards: [] }
      ]
    }
  },
  {
    id: "ev_80",
    type: "combat",
    title: "우두머리 화난 설산 산양",
    description: "영역을 침범한 것에 격노했는지 두껍고 딱딱한 뿔을 가진 거대한 숫산양이 머리를 낮춘 채 박치기를 시도합니다.",
    monster: {
      id: "wild_goat",
      name: "우두머리 산양",
      hp: 90,
      maxHp: 90,
      atk: 16,
      def: 4,
      icon: "🐐",
      rewards: [
        { id: "raw_meat", qty: 2 },
        { id: "hide", qty: 2 }
      ]
    }
  },
  {
    id: "ev_81",
    type: "combat",
    title: "날카로운 발톱의 설원 표범",
    description: "지평선 눈 더미 뒤에 완벽히 매복하고 있던 눈표범 한 마리가 번개 같은 속도로 등을 노려 뛰어내립니다.",
    monster: {
      id: "snow_leopard",
      name: "굶주린 눈표범",
      hp: 110,
      maxHp: 110,
      atk: 18,
      def: 3,
      icon: "🐆",
      rewards: [
        { id: "hide", qty: 2 },
        { id: "tendon", qty: 2 }
      ]
    }
  },
  {
    id: "ev_82",
    type: "combat",
    title: "겨울잠에서 깬 동굴 북극곰",
    description: "동굴 깊은 안방에서 잠자던 포악하고 거대한 성체 북극곰 한 마리가 발소리에 깨어 포효하며 습격해 옵니다.",
    monster: {
      id: "cave_bear",
      name: "겨울 동굴 북극곰",
      hp: 160,
      maxHp: 160,
      atk: 22,
      def: 7,
      icon: "🐻‍❄️",
      rewards: [
        { id: "raw_meat", qty: 3 },
        { id: "hide", qty: 3 }
      ]
    }
  },
  {
    id: "ev_83",
    type: "combat",
    title: "전설의 고대 예티 조우!",
    description: "혹한의 신화 속 괴물, 3미터 크기의 새하얀 털을 가진 오만하고 괴력 넘치는 설산 예티가 침입자를 격퇴하려 듭니다.",
    monster: {
      id: "yeti",
      name: "설산 거대 예티",
      hp: 250,
      maxHp: 250,
      atk: 26,
      def: 10,
      icon: "👹",
      rewards: [
        { id: "hide", qty: 5 },
        { id: "tendon", qty: 3 }
      ]
    }
  },
  {
    id: "ev_84",
    type: "combat",
    title: "오작동 군용 중형 경비로봇",
    description: "눈보라 너머 방치된 초소 잔해에서 붉은 센서를 껌빡이며 경고음을 울리던 구형 무인 살상용 기계 로봇이 발포를 감행합니다.",
    monster: {
      id: "guard_robot",
      name: "경비 로봇 XT-1",
      hp: 140,
      maxHp: 140,
      atk: 18,
      def: 8,
      icon: "🤖",
      rewards: [
        { id: "scrap_circuit", qty: 2 },
        { id: "wire", qty: 3 }
      ]
    }
  },
  {
    id: "ev_85",
    type: "combat",
    title: "검은 등 야생 우두머리 늑대",
    description: "보통 늑대보다 1.5배 거대하고 수많은 흉터를 지닌 무리의 지도자 늑대가 당신의 숨통을 끊고자 돌진해 옵니다.",
    monster: {
      id: "boss_wolf",
      name: "우두머리 검은늑대",
      hp: 100,
      maxHp: 100,
      atk: 16,
      def: 4,
      icon: "🐺",
      rewards: [
        { id: "raw_meat", qty: 2 },
        { id: "hide", qty: 2 }
      ]
    }
  },

  // ==========================================
  // 길들이기 이벤트 6종 (ev_86 ~ ev_91)
  // ==========================================
  {
    id: "ev_86",
    title: "얼어붙은 아기 허스키 조우",
    description: "썰매 사고로 낙오된 모양인지 새하얀 눈 구덩이 틈새에서 파들파들 꼬리를 떨며 신음하는 귀여운 아기 허스키를 발견했습니다.",
    options: [
      {
        text: "생고기 1개를 먹이며 품에 감싸 길들인다 (생고기 소모)",
        requiredItem: "raw_meat",
        consumeItem: true,
        tamePet: { id: "husky", name: "허스키(실버)" },
        resultText: "고기를 순식간에 해치우더니 든든한 꼬리침을 날리며 신나게 짖습니다. 동료 펫이 되었습니다!"
      },
      {
        text: "그냥 스쳐 지나간다",
        resultText: "아쉬움 속에 허스키를 놔두고 떠납니다."
      }
    ]
  },
  {
    id: "ev_87",
    title: "다리를 다친 붉은 북극여우",
    description: "올가미 덫 철사에 앞발이 긁혀 붉은 피를 흘리며 경계태세를 취하고 있는 새하얀 털빛의 북극여우 한 마리가 길목을 막고 서있습니다.",
    options: [
      {
        text: "약초 1개로 정성스레 지혈 붕대를 감아 길들인다 (약초 소모)",
        requiredItem: "herb",
        consumeItem: true,
        tamePet: { id: "arctic_fox", name: "북극여우(루루)" },
        resultText: "통증이 가라앉자 여우가 고개를 조아리며 경계를 풉니다. 펫 동료가 되었습니다!"
      },
      {
        text: "발길을 서둘러 피한다",
        resultText: "여우가 도망치듯 눈길 건너로 사라져 버렸습니다."
      }
    ]
  },
  {
    id: "ev_88",
    title: "폭설에 날개가 얼어붙은 올빼미",
    description: "매서운 혹한의 얼음 비를 맞아 날개 깃이 꽁꽁 얼어 퍼덕거리지 못하고 나뭇가지 밑에 주저앉아 바들바들 떠는 눈올빼미가 보입니다.",
    options: [
      {
        text: "땔감 나뭇가지 2개로 작은 모닥불을 때어 몸을 녹여 길들인다 (나뭇가지 2 소모)",
        requiredItem: "wood",
        consumeItem: true,
        tamePet: { id: "snow_owl", name: "눈올빼미(미미)" },
        resultText: "은은한 불길 속에서 날개 얼음이 녹자, 당신의 어깨 위에 살포시내려앉아 안깁니다. 펫 동료로 합류했습니다!"
      },
      {
        text: "그냥 지나간다",
        resultText: "차가운 하늘로 날아가 버리길 마음속으로 빌며 스쳐갑니다."
      }
    ]
  },
  {
    id: "ev_89",
    title: "눈밭의 낙오된 어린 순록",
    description: "무리를 잃었는지 깊은 늪 형태의 폭설 밭에 다리가 빠진 채 웅크리고 숨을 헐떡이며 지쳐있는 어린 순록 한 마리를 조우했습니다.",
    options: [
      {
        text: "눈뭉치 3개로 목마름을 축이게 해주며 도와 길들인다 (눈뭉치 3 소모)",
        requiredItem: "snow",
        consumeItem: true,
        tamePet: { id: "reindeer", name: "순록(루돌프)" },
        resultText: "눈뭉치를 먹고 기운을 얻은 순록이 몸을 짚고 일어납니다. 당신의 배낭 끈을 코로 밀며 따르기 시작합니다!"
      },
      {
        text: "그냥 버려두고 이동한다",
        resultText: "스스로 빠져나오길 바라며 전진합니다."
      }
    ]
  },
  {
    id: "ev_90",
    title: "폐어그물에 포박된 바다 물개",
    description: "해안가 빙판 둔덕 위에서 질긴 플라스틱 폐그물 밧줄에 온몸이 조여서 고통스럽게 꿈틀거리는 하프 물개를 보았습니다.",
    options: [
      {
        text: "고철 조각 1개를 예리한 칼날 지렛대처럼 써서 묶인 그물을 찢어준다 (고철 1 소모)",
        requiredItem: "metal",
        consumeItem: true,
        tamePet: { id: "seal", name: "물개(뀨뀨)" },
        resultText: "속박에서 풀려나 자유로워진 물개가 기쁨에 차 짖어대며 곁을 맴돕니다. 펫으로 아군에 연동되었습니다!"
      },
      {
        text: "귀찮은 일에 엮이지 않게 돌아간다",
        resultText: "고통 속의 물개를 외면한 채 복귀합니다."
      }
    ]
  },
  {
    id: "ev_91",
    title: "새끼 북극곰과의 극적 만남",
    description: "눈 더미 아래 조그마한 곰 굴 입구에서 엄마를 애처롭게 울며 찾고 있는 작은 새끼 털뭉치 북극곰이 뒹굴거리고 있습니다.",
    options: [
      {
        text: "아껴둔 구운 고기 2개를 나누어 신뢰를 쌓아 길들인다 (구운 고기 2 소모)",
        requiredItem: "cooked_meat",
        consumeItem: true,
        tamePet: { id: "polar_bear", name: "북극곰(웅이)" },
        resultText: "구운 고기 냄새에 홀린 새끼 곰이 순식간에 다가와 애교를 떱니다. 최강의 지원 펫으로 우군 동료가 되었습니다!"
      },
      {
        text: "어미곰이 올까 두려워 즉시 도망친다",
        resultText: "흔적을 남기지 않기 위해 지그재그 경로로 은폐 질주합니다."
      }
    ]
  },
  
  // ==========================================
  // [파밍 이벤트 8종] ev_92 ~ ev_99
  // ==========================================
  {
    id: "ev_92",
    type: "farming",
    title: "눈에 파묻힌 보급 드럼통",
    description: "빙하 귀퉁이 눈더미 속에 절반 쯤 박힌 주황색 군용 드럼통을 발견했습니다. 쇠로 단단히 밀봉되어 있지만 틈을 비집어 자원을 뺄 수 있을 것 같습니다.",
    options: [
      {
        text: "드럼통 뚜껑을 억지로 열어 수색한다",
        rewardItem: { id: "wood", qty: 3 },
        resultText: "안쪽에서 상태가 매우 훌륭한 건조 가공 장작 3개를 찾아 획득했습니다."
      }
    ]
  },
  {
    id: "ev_93",
    type: "farming",
    title: "버려진 군용 식량 수송 차량 잔해",
    description: "완전히 얼어붙은 군용 트럭 적재함 안쪽을 보니 군용 레토르트 식량 박스가 일부 보존되어 있는 것이 보입니다.",
    options: [
      {
        text: "보존 상자들을 뜯어 식량을 챙긴다",
        rewardItem: { id: "cooked_meat", qty: 2 },
        resultText: "열량이 매우 높은 육포 캔캔 2개를 무사히 확보했습니다!"
      }
    ]
  },
  {
    id: "ev_94",
    type: "farming",
    title: "얼어붙은 강가의 천연 약초 군락",
    description: "빙벽 아래 흐르는 따뜻한 온수 틈새에 한기를 이겨내고 자라난 귀중한 극지 약초 더미들이 싱싱한 잎사귀를 뽐내고 있습니다.",
    options: [
      {
        text: "조심스럽게 약초 잎들을 뿌리째 수확한다",
        rewardItem: { id: "herb", qty: 3 },
        resultText: "생존과 응급 치유에 매우 요긴하게 사용할 수 있는 약초 3잎을 확보했습니다."
      }
    ]
  },
  {
    id: "ev_95",
    type: "farming",
    title: "폭풍우 속 유실된 기지 공구함",
    description: "통신 기지 펜스 곁에 버려져 있던 붉은 강철 공구함이 한쪽 모퉁이가 찌그러진 채 뒹굴고 있습니다.",
    options: [
      {
        text: "공구함을 열어 내장 기계 소자를 파헤친다",
        rewardItem: { id: "scrap_circuit", qty: 1 },
        resultText: "고가치 회로 부속인 고장난 기판 회로 1개를 안전하게 탈취했습니다."
      }
    ]
  },
  {
    id: "ev_96",
    type: "farming",
    title: "숨겨진 극지 겨울 동물의 빈 둥지",
    description: "바람이 거세게 불던 날, 버려진 통나무 둥지 틈새에서 새들이 둥지를 틀 때 모아두었던 부드러운 솜털 장식을 발견했습니다.",
    options: [
      {
        text: "둥지 안쪽의 솜깃털을 쓸어 담는다",
        rewardItem: { id: "feather", qty: 4 },
        resultText: "단열성이 뛰어난 솜깃털 4개를 얻어 주머니를 보강했습니다."
      }
    ]
  },
  {
    id: "ev_97",
    type: "farming",
    title: "산사태 후 유실된 석탄 화물선 박스",
    description: "과거 석탄 수송 썰매로 쓰이던 철재 보급 상자가 경사면 아래에 무너져 석탄 광석들이 눈 위에 쏟아져 있는 것을 발견했습니다.",
    options: [
      {
        text: "눈더미 속 석탄 덩어리들을 주워 챙긴다",
        rewardItem: { id: "coal", qty: 3 },
        resultText: "강력한 화력을 지닌 검은 석탄 덩어리 3개를 획득하여 모닥불 땔감용으로 챙겼습니다."
      }
    ]
  },
  {
    id: "ev_98",
    type: "farming",
    title: "혹한 속 꽁꽁 얼어붙은 보물 배낭",
    description: "과거 극지 생존자가 메고 다녔던 것처럼 보이는 단단하게 언 가방이 버려져 있습니다. 가방 안에서 특수 단열 처리된 부츠가 보입니다.",
    options: [
      {
        text: "지퍼를 강제로 뜯어 부츠를 가방에서 꺼낸다",
        rewardItem: { id: "boots_insulated", qty: 1 },
        resultText: "혹한의 동상을 완벽히 막아줄 최고급 단열 부츠 1켤레를 획득하는 대성공을 거두었습니다!"
      }
    ]
  },
  {
    id: "ev_99",
    type: "farming",
    title: "조난 텐트 주변의 말린 장작 더미",
    description: "바람을 피해 쳐진 낡은 천막 방수포 아래에 눈을 타지 않고 건조하게 잘 마른 나뭇가지 장작 더미가 정돈되어 보관되어 있습니다.",
    options: [
      {
        text: "장작 더미와 부싯돌 돌멩이를 가방에 가득 싣는다",
        rewardItem: { id: "wood", qty: 5 },
        resultText: "나뭇가지 5개를 무더기로 가방에 쓸어 담아 안전하게 확보했습니다."
      }
    ]
  },

  // ==========================================
  // [전투 이벤트 8종] ev_100 ~ ev_107
  // ==========================================
  {
    id: "ev_100",
    type: "combat",
    title: "눈보라 속 광기 서린 야생 토끼",
    description: "털을 곤두세우고 기괴하게 입을 벌린 붉은 눈의 성질 더러운 설원 토끼가 갑자기 당신의 발목을 물어 뜯으려 돌진해 옵니다!",
    monster: {
      id: "mad_rabbit",
      name: "설원 광토끼",
      hp: 30,
      maxHp: 30,
      atk: 6,
      def: 0,
      icon: "🐇",
      rewards: [
        { id: "raw_meat", qty: 1 },
        { id: "tendon", qty: 1 }
      ]
    }
  },
  {
    id: "ev_101",
    type: "combat",
    title: "빙벽 위의 성난 야생 순록 조우",
    description: "길을 가던 중 뿔이 길쭉하게 잘 뻗은 한 녀석이 자신의 영역을 지키려는 듯 발굽을 구르며 돌진하려 조준해 옵니다.",
    monster: {
      id: "reindeer_wild",
      name: "성난 설원순록",
      hp: 70,
      maxHp: 70,
      atk: 11,
      def: 1,
      icon: "🦌",
      rewards: [
        { id: "raw_meat", qty: 2 },
        { id: "hide", qty: 1 }
      ]
    }
  },
  {
    id: "ev_102",
    type: "combat",
    title: "빙하 속 고대 거대 얼음 벌레",
    description: "얼음 장벽을 오르던 중 틈새에서 번뜩이며 깨어난 푸르스름한 고대 얼음 기생 곤충이 끈적한 냉기를 흘리며 기어 나옵니다.",
    monster: {
      id: "ice_bug",
      name: "고대 얼음벌레",
      hp: 45,
      maxHp: 45,
      atk: 9,
      def: 0,
      icon: "🐛",
      rewards: [
        { id: "tendon", qty: 2 }
      ]
    }
  },
  {
    id: "ev_103",
    type: "combat",
    title: "설산 고지대의 굶주린 살쾡이",
    description: "암벽을 오를 무렵, 머리 위의 바위 돌출부에 웅크리고 있던 얼룩무늬 살쾡이가 털을 세우고 아래를 덮쳐 내려옵니다.",
    monster: {
      id: "wild_cat",
      name: "굶주린 설원살쾡이",
      hp: 55,
      maxHp: 55,
      atk: 10,
      def: 0,
      icon: "🐱",
      rewards: [
        { id: "raw_meat", qty: 1 },
        { id: "hide", qty: 1 }
      ]
    }
  },
  {
    id: "ev_104",
    type: "combat",
    title: "빙판 아래 솟구친 괴물 물고기",
    description: "얼음 구멍에서 솟구치듯 날뛰며 날카로운 이빨을 드러낸, 혹독한 추위 속에 진화한 변종 얼음 상어 괴물이 빙판 위로 튀어 오릅니다.",
    monster: {
      id: "ice_fish",
      name: "얼음 이빨괴물고기",
      hp: 65,
      maxHp: 65,
      atk: 12,
      def: 0,
      icon: "🐟",
      rewards: [
        { id: "raw_meat", qty: 2 }
      ]
    }
  },
  {
    id: "ev_105",
    type: "combat",
    title: "오작동 레이더 기지의 정찰 드론",
    description: "방치된 공군 레이더 지대에서 전원 회로가 오작동해 감지 범위 내의 모든 대상을 적으로 인식하여 사격 레이저를 켜는 드론을 맞닥뜨렸습니다.",
    monster: {
      id: "patrol_drone",
      name: "오작동 정찰드론",
      hp: 75,
      maxHp: 75,
      atk: 13,
      def: 2,
      icon: "🛸",
      rewards: [
        { id: "scrap_circuit", qty: 1 },
        { id: "wire", qty: 2 }
      ]
    }
  },
  {
    id: "ev_106",
    type: "combat",
    title: "광기 서린 붉은눈 여우",
    description: "북극여우 치고는 비정상적으로 덩치가 크고 눈에 살기를 띤 미쳐버린 여우 한 마리가 도끼발 모양으로 달려듭니다.",
    monster: {
      id: "mad_fox",
      name: "미쳐버린 여우",
      hp: 50,
      maxHp: 50,
      atk: 10,
      def: 0,
      icon: "🦊",
      rewards: [
        { id: "hide", qty: 1 },
        { id: "tendon", qty: 1 }
      ]
    }
  },
  {
    id: "ev_107",
    type: "combat",
    title: "설원의 탈영병 무장 무법자",
    description: "눈덮인 폐막사 잔해에서 무장을 한 채 총기 대신 날카로운 정강이 강철창을 쥐고 다가오는 탈영병 무법자와 교전을 치러야 합니다.",
    monster: {
      id: "deserter_scout",
      name: "탈영병 무법자",
      hp: 90,
      maxHp: 90,
      atk: 15,
      def: 2,
      icon: "🥷",
      rewards: [
        { id: "metal", qty: 2 },
        { id: "cloth", qty: 2 }
      ]
    }
  },

  // ==========================================
  // [위험 이벤트 8종] ev_108 ~ ev_115
  // ==========================================
  {
    id: "ev_108",
    type: "hazard",
    title: "얼음 협곡의 갑작스러운 눈사태",
    description: "멀리서 울린 굉음과 함께 톤 단위의 엄청난 쌓인 눈덩이들이 비탈길을 따라 당신을 향해 무서운 기세로 쓰러져 내리기 시작합니다!",
    options: [
      {
        text: "몸을 웅크리고 단단한 바위 절벽 틈새로 피한다 (체력 -30, 체온 -10)",
        effect: { health: -30, warmth: -10 },
        resultText: "바위 틈 덕분에 생매장되는 참사는 피했으나, 밀려든 눈무더기의 엄청난 압박력과 추위 탓에 몸에 큰 동상과 골절을 입었습니다."
      }
    ]
  },
  {
    id: "ev_109",
    type: "hazard",
    title: "동토의 매서운 혹한 급하강 기류",
    description: "급격히 기압이 떨어지며 체감 온도를 -50도 이하로 깎아버리는 혹독한 극지 블리자드 바람이 당신의 살갗을 파고듭니다.",
    options: [
      {
        text: "옷을 여미고 바닥을 파서 웅크려 체온을 가둔다 (체온 -35, 정신력 -10)",
        effect: { warmth: -35, sanity: -10 },
        resultText: "이를 덜덜 떨며 모진 칼바람이 지나가길 기도했습니다. 전신이 얼어붙는 고통에 정신력이 마모됩니다."
      }
    ]
  },
  {
    id: "ev_110",
    type: "hazard",
    title: "상한 군용 레이션 통조림 섭취",
    description: "허기를 참지 못하고 부풀어 오른 낡은 비상 레이션 캔을 따서 먹었더니, 목을 넘어가는 순간 썩은 냄새와 함께 속이 뒤틀려 옵니다.",
    options: [
      {
        text: "심한 복통과 오한에 쓰러진다 (체력 -20, 허기 -15)",
        effect: { health: -20, hunger: -15 },
        resultText: "극심한 식중독 증세로 위액을 전부 토해내며, 체력과 아까운 포만감만 심각하게 낭비하는 대참사를 입었습니다."
      }
    ]
  },
  {
    id: "ev_111",
    type: "hazard",
    title: "보이지 않는 살얼음판 낙상 사고",
    description: "얇은 눈가루 밑에 숨겨져 있던 미끄러운 빙판을 잘못 디디면서 균형을 잃고 비탈 아래 바위 틈으로 크게 굴러떨어졌습니다.",
    options: [
      {
        text: "전신 충격과 함께 겨우 일어난다 (체력 -25)",
        effect: { health: -25 },
        resultText: "다행히 뼈가 부러지진 않았지만, 온몸에 멍이 들고 욱신거리는 타박상을 입어 당분간 움직임이 둔해질 것 같습니다."
      }
    ]
  },
  {
    id: "ev_112",
    type: "hazard",
    title: "방치된 보일러실 유독 메탄 누출",
    description: "대기실 잔해 안쪽을 수색하던 도중, 가스 노즐이 부식되면서 가득 메워져 있던 무색 무취의 치명적인 질식 메탄 연무를 마시고 말았습니다.",
    options: [
      {
        text: "어지럼증을 느끼며 급히 밖으로 기어나간다 (체력 -30, 정신력 -20)",
        effect: { health: -30, sanity: -20 },
        resultText: "폐가 타들어가는 극심한 통증과 함께 구토를 하며 기어 나왔으나, 정신이 아득해져 한참을 드러누워 있어야 했습니다."
      }
    ]
  },
  {
    id: "ev_113",
    type: "hazard",
    title: "하얀 암전 상태와 환청의 공포",
    description: "사방이 전부 흰색으로 통일되어 원근감이 완전 상실되는 설맹과 고립 속에서, 머릿속에 기괴한 야생 맹수의 울음 환청이 반복되어 울립니다.",
    options: [
      {
        text: "머리를 움켜쥐며 평정심을 잃고 헛디딘다 (정신력 -35)",
        effect: { sanity: -35 },
        resultText: "밀려오는 극한의 우울과 고통 속에 자아가 붕괴하기 직전의 공포를 느끼며 야영지로 도망쳐 옵니다."
      }
    ]
  },
  {
    id: "ev_114",
    type: "hazard",
    title: "레이더 기지의 고전압 피복선 누전",
    description: "송전탑 기슭의 철조망 틈새를 기어 지나가려다, 여전히 미세하게 흐르던 고압 전선 피복 누전 지대를 등에 접촉하고 말았습니다.",
    options: [
      {
        text: "강한 전류 스파크와 충격을 겪는다 (체력 -25, 체온 -15)",
        effect: { health: -25, warmth: -15 },
        resultText: "번쩍이는 고열 전류로 전신 신경계가 마비되고 심장이 덜컥거렸으며 심각한 화상 자국을 입었습니다."
      }
    ]
  },
  {
    id: "ev_115",
    type: "hazard",
    title: "얼어붙은 호수의 얇은 얼음 붕괴",
    description: "지름길로 가기 위해 호수 횡단을 시도했으나, 쩍 하는 얼음 갈라지는 살벌한 소리와 함께 영하 20도의 차가운 호수물에 온몸이 절반 잠깁니다.",
    options: [
      {
        text: "필사적으로 얼음판 위로 젖은 몸을 끈다 (체력 -15, 체온 -30)",
        effect: { health: -15, warmth: -30 },
        resultText: "간신히 물속에서 탈출했으나 전신 의류가 꽁꽁 얼어붙어 급격한 동상 증세와 체온 유실을 유도합니다."
      }
    ]
  },

  // ==========================================
  // [탐험 이벤트 8종] ev_116 ~ ev_123
  // ==========================================
  {
    id: "ev_116",
    type: "explore",
    title: "고대 과학 극지 기지의 이중 해치문",
    description: "얼음 벼랑 끝에 버려진 정체불명의 철문이 굳게 잠겨 있습니다. 문 틈새를 억지로 벌리거나 다른 우회로를 수색해야 합니다.",
    options: [
      {
        text: "고철 조각 1개를 쐐기 지렛대처럼 찔러 넣어 해치문을 강제로 뜯는다 (고철 1 소모)",
        requiredItem: "metal",
        consumeItem: true,
        rewardItem: { id: "medkit", qty: 1 },
        resultText: "쾅 하고 쐐기가 맞물려 문이 열렸고, 내부에 깨끗하게 보관되어 있던 미개봉 정품 구급상자 1개를 손에 넣었습니다!"
      },
      {
        text: "억지로 뜯지 않고 기지 주변 환기창 틈을 가볍게 수색한다 (체력 -10)",
        effect: { health: -10 },
        rewardItem: { id: "matches", qty: 2 },
        resultText: "좁은 통로를 비집고 다니다가 긁혀 가벼운 찰과상을 입었지만 비상 성냥 2갑을 확보하는 데 성공했습니다."
      }
    ]
  },
  {
    id: "ev_117",
    type: "explore",
    title: "빙벽 단면에 기괴하게 굳은 고대 화석",
    description: "수만 년 전에 빙하 밑으로 깔려 들어간 듯한 신비로운 곤충 혹은 결정 화석 덩어리가 벽면 깊이 묻혀 반짝입니다.",
    options: [
      {
        text: "고철 지렛대를 활용해 벽면을 예리하게 파낸다 (고철 1 소모)",
        requiredItem: "metal",
        consumeItem: true,
        rewardItem: { id: "tendon", qty: 3 },
        resultText: "단단한 빙벽을 뚫고 뼈 화석과 얽혀 있는 매우 질긴 고대 힘줄 섬유 3타래를 채취했습니다."
      },
      {
        text: "손으로 만지며 마모된 표면의 지혜를 가만히 관찰한다 (정신력 +15)",
        effect: { sanity: 15 },
        resultText: "고대 세월의 압도적인 침묵과 경이로움을 보며, 혼란스럽던 마음의 평정을 되찾고 가벼운 안식을 얻습니다."
      }
    ]
  },
  {
    id: "ev_118",
    type: "explore",
    title: "통신실 송전용 미니 비상 발전기",
    description: "무너진 중계 기지 한 켠에 기판이 탄 채 멈춰 서 있는 미니 정밀 송전 발전기를 찾았습니다. 구리선을 적절히 이으면 전류가 통할 것 같습니다.",
    options: [
      {
        text: "구리선 1개를 끊어 탄 기판 전선 배선을 우회 우회 수선한다 (구리선 1 소모)",
        requiredItem: "wire",
        consumeItem: true,
        rewardItem: { id: "scrap_circuit", qty: 1 },
        resultText: "스파크가 튀며 발전기 보조 칩셋 전원이 켜졌고, 고장난 회로 기판 부속을 무사히 복구하여 확보했습니다."
      },
      {
        text: "발전기는 두고 실내에서 주워 쓸 장작을 모아 철수한다",
        rewardItem: { id: "wood", qty: 2 },
        resultText: "위험한 배선 작업을 포기하고 대신 주변 바닥에 흩어져 있던 나무 의자 다리에서 장작 2개를 모았습니다."
      }
    ]
  },
  {
    id: "ev_119",
    type: "explore",
    title: "빙하 벼랑 끝의 녹슨 밧줄 조난 사다리",
    description: "깊은 크레바스 아래로 안전하게 착륙할 수 있는 것처럼 보이는 구식 강철 와이어 로프 사다리가 절벽 벽에 걸쳐 있습니다.",
    options: [
      {
        text: "자신의 가죽 장비를 쐐기로 보강해 와이어를 잡고 내려간다 (짐승 가죽 1 소모)",
        requiredItem: "hide",
        consumeItem: true,
        rewardItem: { id: "medkit", qty: 1 },
        resultText: "안전하게 마찰을 이기며 절벽 바닥 틈새 조난 주머니에 접근했고 최고의 구급상자 1개를 찾아 들고 왔습니다."
      },
      {
        text: "안전장비 없이 와이어 사다리를 기어 오른다 (체력 -20)",
        effect: { health: -20 },
        rewardItem: { id: "metal", qty: 2 },
        resultText: "사다리가 흔들리며 다리를 세게 부딪쳤으나 아래쪽 유해물 틈새에서 순도 높은 고철 2개를 간신히 들고 돌아왔습니다."
      }
    ]
  },
  {
    id: "ev_120",
    type: "explore",
    title: "바람막이 천 아래 숨겨진 고립 야영 텐트",
    description: "오래 전 실종된 연구원들의 것으로 추정되는 단열막 방풍 텐트가 여전히 빙판 위에 처져 있습니다. 안쪽에 무언가 남겨져 있을 것 같습니다.",
    options: [
      {
        text: "사망한 연구원을 위해 애도를 표한 뒤 조심스럽게 수색한다 (정신력 -10)",
        effect: { sanity: -10 },
        rewardItem: { id: "medkit", qty: 1 },
        resultText: "씁쓸하고 처연한 마음에 기도를 드린 뒤 텐트 비상함에서 아직 멀쩡한 대형 구급상자 1개를 주워 챙겼습니다."
      },
      {
        text: "텐트 구조물 뼈대 천막을 통째로 뜯어 가방 원료로 쓴다",
        rewardItem: { id: "cloth", qty: 3 },
        resultText: "천막 방수포를 뜯어내 튼튼하고 깨끗한 단열 천 조각 3장을 넉넉히 가공하여 획득했습니다."
      }
    ]
  },
  {
    id: "ev_121",
    type: "explore",
    title: "침묵의 극지 자작나무 숲 그늘",
    description: "바람이 전혀 불지 않아 기이할 정도로 평화롭고 고요한 하얀 극지 자작나무 숲 지대를 지납니다.",
    options: [
      {
        text: "쇠창을 조각 지렛대로 활용해 죽은 나무 가지를 사정없이 벌목한다",
        requiredItem: "spear",
        rewardItem: { id: "wood", qty: 4 },
        resultText: "튼튼한 강철창 날을 활용해 굵고 잘 쪼개지는 자작나무 나뭇가지 4개를 신속 벌목했습니다."
      },
      {
        text: "나무 아래 비스듬히 앉아 맑은 공기를 쐬며 명상에 든다 (정신력 +20, 체온 -10)",
        effect: { sanity: 20, warmth: -10 },
        resultText: "머리를 어지럽히던 불안감이 신기루처럼 사라지는 가치 있는 정신적 안정을 숲속에서 획득했습니다."
      }
    ]
  },
  {
    id: "ev_122",
    type: "explore",
    title: "무너진 거대한 만년설 얼음굴의 비틀린 터널",
    description: "빛이 거의 닿지 않는 어두운 얼음굴 터널 양쪽으로 각각 웅웅거리는 미세한 바람이 불어오는 분기점을 만났습니다.",
    options: [
      {
        text: "구리선의 약한 유도 정전기 나침반 원리로 바람의 출구를 찾는다 (구리선 1 소모)",
        requiredItem: "wire",
        consumeItem: true,
        rewardItem: { id: "flint", qty: 2 },
        resultText: "구리선이 약하게 쏠리는 정전기를 감지하고 동굴 틈을 통과했고 비상 부싯돌 2개를 무사히 발견했습니다."
      },
      {
        text: "감으로 왼쪽 어두운 내리막 길을 골라 거칠게 헤쳐 간다 (체온 -15)",
        effect: { warmth: -15 },
        rewardItem: { id: "coal", qty: 1 },
        resultText: "엄청난 냉기 가득한 구멍을 헤집고 통과했으나 그 바닥 지대에서 불에 타기 좋은 천연 석탄 광석 1개를 주워 챙겼습니다."
      }
    ]
  },
  {
    id: "ev_123",
    type: "explore",
    title: "밤하늘을 화려하게 덮은 연두빛 오로라 현상",
    description: "이 세상의 풍경이 아닌 것처럼 극도로 화려한 광막한 녹색 광선 띠 오로라가 지평선 산봉우리를 뒤덮고 있습니다.",
    options: [
      {
        text: "눈보라를 잠시 피하고 빙판 경사에 누워 현상을 넋 놓고 감상한다 (정신력 +30)",
        effect: { sanity: 30 },
        resultText: "극지 고립에 대한 두려움과 공포가 말끔히 씻겨내려가며, 영혼 깊이 뜨거운 생존 의지를 재점화합니다."
      },
      {
        text: "오로라 자기장 쏠림 틈새로 튀어나온 기묘한 자기 결정 광물을 채취한다",
        rewardItem: { id: "flint", qty: 2 },
        resultText: "오로라 전자기 폭풍 영향으로 지표에 박혀 튀어나온 유용한 정밀 부싯돌 광석 2개를 무사히 손에 넣었습니다."
      }
    ]
  },

  // ==========================================
  // [생활일지 이벤트 8종] ev_124 ~ ev_131
  // ==========================================
  {
    id: "ev_124",
    type: "journal",
    title: "무리에서 낙오되어 숲을 헤매는 야생 순록",
    description: "빙판 늪지대 덤불 곁에서 길을 잃고 눈밭에 웅크려 벌벌 떨고 있는 아직 길들지 않은 털빛 고운 순록 한 마리가 있습니다.",
    options: [
      {
        text: "나뭇가지 4개를 장작 더미 삼아 순록의 주변에 불씨를 지펴 경계를 푼다 (나뭇가지 4 소모)",
        requiredItem: "wood",
        consumeItem: true,
        tamePet: { id: "reindeer", name: "순록(꽃사슴)" },
        resultText: "불의 온기에 다가와 몸을 비비며 순록이 신뢰를 보입니다. 훌륭한 방호 및 생존 보조 펫으로 동행합니다!"
      },
      {
        text: "조용히 순록의 영역에서 물러나 야영지로 복귀한다",
        resultText: "소리 죽여 조심히 뒷걸음질치며 무사히 자리를 떠났습니다."
      }
    ]
  },
  {
    id: "ev_125",
    type: "journal",
    title: "나무 틈에 갇혀 퍼덕거리는 거대 눈올빼미",
    description: "자작나무 갈라진 가지 틈새에 한쪽 부리와 깃털이 끼어 탈출하지 못하고 지친 날갯짓을 구걸하는 아름다운 흰올빼미가 보입니다.",
    options: [
      {
        text: "생고기 1개를 던져 안심시킨 뒤 나뭇가지를 치워 구조한다 (생고기 1 소모)",
        requiredItem: "raw_meat",
        consumeItem: true,
        tamePet: { id: "snow_owl", name: "올빼미(헤드윅)" },
        resultText: "고기를 먹으며 경계를 푼 올빼미의 날개를 다치지 않게 조심히 구출했습니다. 정찰용 올빼미가 펫으로 결합됩니다!"
      },
      {
        text: "날갯짓 소리가 적을 부를까 두려워 우회 수색한다",
        resultText: "올빼미를 외면하고 멀리 돌아서 가던 길을 재촉합니다."
      }
    ]
  },
  {
    id: "ev_126",
    type: "journal",
    title: "빙벽 틈 얼어붙어 꿈틀거리는 아기 물개",
    description: "엄마를 잃어버린 듯한 작은 아기 고리무늬 물개가 차가운 빙판 위에서 슬픈 목소리로 울어대고 있습니다.",
    options: [
      {
        text: "깨끗한 천 2장을 보온 돗자리처럼 엮어 물개 몸통을 포근히 둘러준다 (천 2 소모)",
        requiredItem: "cloth",
        consumeItem: true,
        tamePet: { id: "seal", name: "물개(뚱이)" },
        resultText: "따뜻한 단열 천 덕에 활력을 찾은 아기 물개가 졸졸 따라옵니다. 생존의 귀여운 동반자 펫으로 영입했습니다!"
      },
      {
        text: "생태계 섭리에 맡기고 조용히 돌아서 떠난다",
        resultText: "눈 더미 언덕을 건너와 조용히 자취를 감췄습니다."
      }
    ]
  },
  {
    id: "ev_127",
    type: "journal",
    title: "버려진 공학 텐트 내 기계 공작 흔적",
    description: "과거 극지 엔지니어들이 바람을 이기기 위해 텐트를 보수하고 방풍 가림막 배선을 세우던 정밀한 공학 설계 노트 흔적을 발견했습니다.",
    options: [
      {
        text: "추위와 한기에 떨며 노트를 정독하고 공학 요령을 습득한다 (정신력 -15)",
        effect: { sanity: -15 },
        rewardItem: { id: "journal_engineering", qty: 1 },
        resultText: "정신적인 피로가 몰려오지만 단열과 기지 강화를 보조하는 정비 공학 일지 1권을 완벽히 해금 장착 가능한 상태로 확보했습니다!"
      }
    ]
  },
  {
    id: "ev_128",
    type: "journal",
    title: "조난 생존자의 얼음 낚시 가마솥과 서적",
    description: "얼어붙은 호수가 막사 안에서 극한의 한기를 이기고 물고기를 조리해 최적의 열량 스튜를 끓여내던 요리 일지 사본을 찾았습니다.",
    options: [
      {
        text: "요리법 노트를 꼼꼼히 모사하며 비결을 습득한다 (허기 -10)",
        effect: { hunger: -10 },
        rewardItem: { id: "journal_cooking", qty: 1 },
        resultText: "뱃가죽이 졸아들고 영양 손실이 왔지만 스튜 조리가 수록된 조리 기법 일지 1권을 성공적으로 손에 넣었습니다."
      }
    ]
  },
  {
    id: "ev_129",
    type: "journal",
    title: "동굴 깊은 곳 기도를 올리다 얼어붙은 수도승의 서적",
    description: "얼음 동굴의 깊은 제단 틈새에서 극한의 추위를 기도로 극복하고자 했던 신비로운 생존 철학 수도승의 유품 책이 보입니다.",
    options: [
      {
        text: "경건한 자세로 일지를 정성껏 분석 독서한다 (정신력 -10)",
        effect: { sanity: -10 },
        rewardItem: { id: "journal_meditation", qty: 1 },
        resultText: "머리가 지끈거리지만 극지 정신 단련법이 상세히 적힌 정신 수양 일지 1권을 확보하여 습득했습니다."
      }
    ]
  },
  {
    id: "ev_130",
    type: "journal",
    title: "설산 경비 초소의 방치된 과녁판과 교본",
    description: "과거 군 기지의 조준 사격 표적 판 아래 철제 상자에서 극지 야생 동물들의 해부도와 사냥 공략 루트가 적힌 책자가 보관되어 있습니다.",
    options: [
      {
        text: "손끝을 녹여가며 수렵 동선 교본을 열심히 모사해 일지를 만든다 (체온 -10)",
        effect: { warmth: -10 },
        rewardItem: { id: "journal_hunting", qty: 1 },
        resultText: "체온 하락을 무릅쓰고 필기한 덕에 야생 덫과 사냥을 돕는 사냥 기록 일지 1권을 획득하는 데 성공했습니다."
      }
    ]
  },
  {
    id: "ev_131",
    type: "journal",
    title: "아기 짐승을 조련하던 조련사의 기록 일지",
    description: "눈 덮인 침엽수 그늘 아래 뒹구는 가죽 숄더백 안쪽 방수 주머니에 동물과 교감하며 야생성을 달래고 펫의 능력을 각성시키던 핵심 책자가 보입니다.",
    options: [
      {
        text: "가죽 백을 뜯어 동물 조련 비법이 적힌 문서를 확보한다 (허기 -15)",
        effect: { hunger: -15 },
        rewardItem: { id: "journal_taming", qty: 1 },
        resultText: "기력 소모가 컸으나, 펫 능력을 영구 보강하는 기지 행동을 주는 동물 조련 일지 1권을 손에 넣는 기쁨을 얻었습니다!"
      }
    ]
  },
  {
    id: "ev_132",
    type: "combat",
    title: "극지 약탈자 정찰조의 급습",
    description: "수색을 진행하던 중, 사냥용 도끼와 창으로 무장한 약탈자 정찰조 2명이 눈보라 속에서 튀어나와 앞뒤를 가로막습니다!",
    monster: {
      id: "raider_scouts",
      name: "약탈자 정찰조",
      enemies: [
        { id: "raider", name: "약탈자 수색병", hp: 50, maxHp: 50, atk: 10, def: 1, icon: "👤", rewards: [{ id: "metal", qty: 1 }] },
        { id: "raider", name: "약탈자 전투병", hp: 65, maxHp: 65, atk: 13, def: 2, icon: "👤", rewards: [{ id: "cloth", qty: 2 }] }
      ]
    }
  },
  {
    id: "ev_133",
    type: "combat",
    title: "굶주린 야생 늑대떼와의 격돌",
    description: "피 비린내를 맡았는지 매서운 눈빛을 한 야생 늑대 3마리가 으르렁거리며 겹겹이 포위망을 좁혀옵니다.",
    monster: {
      id: "wolf_pack",
      name: "야생 늑대 무리",
      enemies: [
        { id: "wolf", name: "굶주린 어린 늑대 A", hp: 40, maxHp: 40, atk: 8, def: 1, icon: "🐺", rewards: [{ id: "raw_meat", qty: 1 }] },
        { id: "wolf", name: "굶주린 어린 늑대 B", hp: 40, maxHp: 40, atk: 8, def: 1, icon: "🐺", rewards: [{ id: "tendon", qty: 1 }] },
        { id: "boss_wolf", name: "우두머리 검은늑대", hp: 80, maxHp: 80, atk: 15, def: 3, icon: "🐺", rewards: [{ id: "hide", qty: 2 }] }
      ]
    }
  },
  {
    id: "ev_134",
    type: "combat",
    title: "빙하 틈새의 얼음 지네 둥지",
    description: "얼어붙은 흙을 파내던 중, 단단한 껍질과 수많은 다리를 가진 징그러운 고대 얼음 지네 무리가 꿈틀거리며 튀어나옵니다.",
    monster: {
      id: "ice_centipedes",
      name: "얼음 지네 떼",
      enemies: [
        { id: "ice_bug", name: "새끼 얼음지네 A", hp: 30, maxHp: 30, atk: 7, def: 0, icon: "🐛", rewards: [{ id: "tendon", qty: 1 }] },
        { id: "ice_bug", name: "새끼 얼음지네 B", hp: 30, maxHp: 30, atk: 7, def: 0, icon: "🐛", rewards: [{ id: "tendon", qty: 1 }] },
        { id: "ice_bug", name: "거대 얼음지네", hp: 50, maxHp: 50, atk: 11, def: 1, icon: "🐛", rewards: [{ id: "tendon", qty: 2 }] }
      ]
    }
  },
  {
    id: "ev_135",
    type: "combat",
    title: "오작동 군용 정비 드론 편대",
    description: "파괴된 비행 격격고 잔해 근처에서 붉은 불빛을 껌빡이며 가동을 시작한 구형 전투 드론 2기가 위협적인 호버링 소리를 내며 포탑을 겨눕니다.",
    monster: {
      id: "patrol_drone_squad",
      name: "경비 드론 편대",
      enemies: [
        { id: "patrol_drone", name: "레이저 경비드론 A", hp: 45, maxHp: 45, atk: 9, def: 2, icon: "🛸", rewards: [{ id: "wire", qty: 1 }] },
        { id: "patrol_drone", name: "레이저 경비드론 B", hp: 45, maxHp: 45, atk: 9, def: 2, icon: "🛸", rewards: [{ id: "scrap_circuit", qty: 1 }] }
      ]
    }
  },
  {
    id: "ev_136",
    type: "combat",
    title: "설산 혹한의 망령 군집",
    description: "눈보라가 몰아치는 고갯길에서, 차가운 냉기를 머금고 인간 형상으로 뭉친 신비로운 눈의 망령들이 허공을 부유하며 덮쳐옵니다.",
    monster: {
      id: "snow_phantoms",
      name: "혹한의 망령 무리",
      enemies: [
        { id: "yeti", name: "약한 얼음망령", hp: 40, maxHp: 40, atk: 9, def: 1, icon: "👹", rewards: [{ id: "feather", qty: 1 }] },
        { id: "yeti", name: "서리 서린 망령", hp: 60, maxHp: 60, atk: 12, def: 2, icon: "👹", rewards: [{ id: "feather", qty: 2 }] }
      ]
    }
  },
  {
    id: "ev_137",
    type: "combat",
    title: "설산 돌연변이 예티 유체 조우",
    description: "아직 성체가 되지는 않았으나, 돌과 흙을 무자비하게 던져대는 맹렬하고 거친 새끼 예티 1마리와 눈길에서 맞닥뜨렸습니다.",
    monster: {
      id: "young_yeti",
      name: "새끼 설산예티",
      hp: 120,
      maxHp: 120,
      atk: 16,
      def: 5,
      icon: "👹",
      rewards: [
        { id: "hide", qty: 2 },
        { id: "tendon", qty: 2 }
      ]
    }
  },
  {
    id: "ev_138",
    type: "combat",
    title: "강철 이빨의 변종 북극여우",
    description: "비정상적인 기계화 오염으로 인해 턱 and 이빨이 기계 합금처럼 단단해진 사나운 은빛 여우가 침을 흘리며 다리를 노립니다.",
    monster: {
      id: "iron_jaw_fox",
      name: "강철이빨 북극여우",
      hp: 65,
      maxHp: 65,
      atk: 12,
      def: 1,
      icon: "🦊",
      rewards: [
        { id: "hide", qty: 1 },
        { id: "metal", qty: 1 }
      ]
    }
  },
  {
    id: "ev_139",
    type: "combat",
    title: "침식된 군용 실험견의 역습",
    description: "실험실 유리창 잔해를 뚫고 튀어나온, 온몸에 붉은 링거선과 전선이 얽힌 괴이한 사냥개 한 마리가 붉은 눈을 번뜩이며 도약해옵니다.",
    monster: {
      id: "corrupted_hound",
      name: "침식된 실험 사냥개",
      hp: 75,
      maxHp: 75,
      atk: 13,
      def: 2,
      icon: "🐕",
      rewards: [
        { id: "tendon", qty: 2 },
        { id: "wire", qty: 1 }
      ]
    }
  },
  {
    id: "ev_140",
    type: "combat",
    title: "태고의 서리 얼음 거인",
    description: "얼음 협곡 아래 깊이 잠들어 있던 푸르고 투명한 태고의 거대 수호 얼음 골렘이 지반의 진동을 느끼고 눈을 뜹니다.",
    monster: {
      id: "frost_golem",
      name: "태고의 서리 골렘",
      hp: 200,
      maxHp: 200,
      atk: 22,
      def: 9,
      icon: "👹",
      rewards: [
        { id: "flint", qty: 3 },
        { id: "coal", qty: 2 }
      ]
    }
  },
  {
    id: "ev_141",
    type: "combat",
    title: "설산 은빛 매의 공중 급습",
    description: "절벽 길을 아슬아슬하게 지나가던 중, 하늘 높은 곳에서 급강하하며 날카로운 칼날 부리와 발톱을 치켜세운 은빛 매가 습격합니다.",
    monster: {
      id: "silver_hawk",
      name: "설산 은빛매",
      hp: 55,
      maxHp: 55,
      atk: 11,
      def: 0,
      icon: "🦅",
      rewards: [
        { id: "feather", qty: 3 },
        { id: "tendon", qty: 1 }
      ]
    }
  },
  {
    id: "ev_142",
    type: "combat",
    title: "광폭한 설산 송곳니 멧돼지",
    description: "굵직하고 거친 뿔 모양의 어금니를 앞세우고 붉은 김을 내뿜으며 눈더미를 헤치며 전속력으로 돌진해오는 성난 멧돼지가 출현했습니다.",
    monster: {
      id: "snow_boar",
      name: "설산 송곳니멧돼지",
      hp: 95,
      maxHp: 95,
      atk: 15,
      def: 4,
      icon: "🐗",
      rewards: [
        { id: "raw_meat", qty: 3 },
        { id: "hide", qty: 1 }
      ]
    }
  },
  {
    id: "ev_143",
    type: "combat",
    title: "어두운 빙하 균열의 심해 집게",
    description: "해안 얼음 절벽 틈새에서 튀어나온, 두껍고 거대한 얼음 결정 껍질을 등갑으로 두른 고대 게 모양 괴물이 거대한 집게를 쩔컥거립니다.",
    monster: {
      id: "ice_crab",
      name: "빙하 거대 얼음게",
      hp: 110,
      maxHp: 110,
      atk: 14,
      def: 6,
      icon: "🦀",
      rewards: [
        { id: "raw_meat", qty: 2 },
        { id: "metal", qty: 1 }
      ]
    }
  },
  {
    id: "ev_144",
    type: "combat",
    title: "감염되어 미쳐버린 연구원",
    description: "생화학 시설 지하에서 방사능 오염 수치가 급증한 탓인지, 찢어진 방호복을 걸치고 수술용 메스를 마구 휘두르며 광분한 연구원이 접근합니다.",
    monster: {
      id: "corrupted_scientist",
      name: "광기 어린 연구원",
      hp: 80,
      maxHp: 80,
      atk: 13,
      def: 1,
      icon: "👤",
      rewards: [
        { id: "medkit", qty: 1 },
        { id: "scrap_circuit", qty: 1 }
      ]
    }
  },
  {
    id: "ev_145",
    type: "combat",
    title: "극지 무법 총잡이의 습격",
    description: "오래된 화물 적재소 그늘 아래에서 낡았지만 여전히 살상력이 강한 권총을 당신의 머리에 겨누며 지갑과 가방을 요구하는 약탈자입니다.",
    monster: {
      id: "raider_marksman",
      name: "약탈자 권총수",
      hp: 75,
      maxHp: 75,
      atk: 16,
      def: 2,
      icon: "👤",
      rewards: [
        { id: "wire", qty: 2 },
        { id: "metal", qty: 2 }
      ]
    }
  },
  {
    id: "ev_146",
    type: "combat",
    title: "빙벽에 굳어있던 서리 골렘",
    description: "빙하지대를 무리하게 채굴하려 망치를 두드리자, 벽면의 두꺼운 얼음이 쩍 갈라지며 파란 광석 심장을 지닌 전투용 서리 골렘이 깨어납니다.",
    monster: {
      id: "frost_golem_ancient",
      name: "서리 파편골렘",
      hp: 130,
      maxHp: 130,
      atk: 18,
      def: 6,
      icon: "👹",
      rewards: [
        { id: "flint", qty: 2 },
        { id: "metal", qty: 1 }
      ]
    }
  },
  {
    id: "ev_147",
    type: "combat",
    title: "오작동 군용 경비 로봇 개량형",
    description: "방치된 중앙 통제 지대의 입구를 붉은 광선으로 감시하던 중갑 기갑 로봇 1기가 비상 단계를 울리며 내장된 톱날검을 펴며 가동합니다.",
    monster: {
      id: "guard_robot_heavy",
      name: "경비 로봇 XT-2",
      hp: 170,
      maxHp: 170,
      atk: 24,
      def: 9,
      icon: "🤖",
      rewards: [
        { id: "scrap_circuit", qty: 2 },
        { id: "wire", qty: 4 }
      ]
    }
  },
  {
    id: "ev_148",
    type: "combat",
    title: "빙하 수호령 고대 전사",
    description: "신성해 보이는 돌기둥 근처의 관을 조사하려 하자, 차가운 냉기 갑옷을 온몸에 두르고 거대한 얼음 얼라인먼트 창을 든 고대 전사의 영혼이 대치합니다.",
    monster: {
      id: "ancient_knight",
      name: "빙하 고대전사 영혼",
      hp: 150,
      maxHp: 150,
      atk: 20,
      def: 5,
      icon: "🥷",
      rewards: [
        { id: "metal", qty: 3 },
        { id: "tendon", qty: 2 }
      ]
    }
  },
  {
    id: "ev_149",
    type: "combat",
    title: "독 묻은 설산 붉은 전갈",
    description: "마른 나뭇더미를 헤치던 중, 꼬리 끝에 치명적인 마비독 침을 바짝 치켜든 붉은 등껍질의 거대 전갈 한 마리가 기어나와 위협합니다.",
    monster: {
      id: "frost_scorpion",
      name: "설산 붉은꼬리전갈",
      hp: 60,
      maxHp: 60,
      atk: 12,
      def: 3,
      icon: "🦂",
      rewards: [
        { id: "tendon", qty: 3 }
      ]
    }
  },
  {
    id: "ev_150",
    type: "combat",
    title: "어린 길 잃은 북극곰 유체 조우",
    description: "엄마 곰을 잃어버리고 굶주린 탓에 날카롭게 날이 선, 덩치는 다소 작지만 여전히 위협적인 어린 북극곰이 앞을 가로막습니다.",
    monster: {
      id: "young_polar_bear",
      name: "길잃은 아기북극곰",
      hp: 100,
      maxHp: 100,
      atk: 15,
      def: 4,
      icon: "🐻‍❄️",
      rewards: [
        { id: "raw_meat", qty: 2 },
        { id: "hide", qty: 2 }
      ]
    }
  },
  {
    id: "ev_151",
    type: "combat",
    title: "레이더 초소의 자동 경비 포탑",
    description: "벙커 잔해 깊은 곳에서 방어 수칙이 활성화되어 침입자를 타겟팅하는 유도형 소형 발포 경비 포탑 1기가 전면에 출현했습니다.",
    monster: {
      id: "turret_sentry",
      name: "자동 경비포탑",
      hp: 120,
      maxHp: 120,
      atk: 18,
      def: 5,
      icon: "🤖",
      rewards: [
        { id: "wire", qty: 3 },
        { id: "scrap_circuit", qty: 1 }
      ]
    }
  }
];

// 브라우저 환경에서 전역으로 노출
if (typeof window !== 'undefined') {
  window.survivalEvents = survivalEvents;
}
