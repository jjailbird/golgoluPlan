const eatingHabitQuestions = {
  description: '식습관 테스트 문항 2017-02-10',
  groups: [
    { group01: '골고루먹기' },
    { group02: '걸식' },
    { group03: '고지방,고열량,당류' },
    { group04: '나트륨' },
    { group05: '식사조절' },
    { group06: '신체활동' },
  ],
  questions: {
    group01: [
      {
        no: 1,
        question: '과일을 매일 먹습니까?',
        points: [1, 2, 3, 4, 5],
      },
      {
        no: 2,
        question: '나물, 무침, 샐러드 등의 채소 반찬을 자주 먹습니까?',
        points: [1, 2, 3, 4, 5],
      },
      {
        no: 3,
        question: '우유, 유제품(치즈, 요구르트 등)을 매일 먹습니까?',
        points: [1, 2, 3, 4, 5],
      },
      {
        no: 4,
        question: '미역, 파래, 김 등의 해조류를 일주일에 2회 이상 먹습니까?',
        points: [1, 2, 3, 4, 5],
      },
      {
        no: 5,
        question: '평소 여러가지 음식을 골고루 먹습니까?',
        points: [1, 2, 3, 4, 5],
      },
      {
        no: 6,
        question: '곡류(쌀밥, 잡곡밥, 국수, 빵 등)를 매끼 먹습니까?',
        points: [1, 2, 3, 4, 5],
      },
      {
        no: 7,
        question: '(배추김치, 깍두기 등)를 매끼 먹습니까?',
        points: [1, 2, 3, 4, 5],
      },
      {
        no: 8,
        question: '식사할 때 고기, 생선, 달걀, 콩, 두부 중 하나 이상을 매끼 먹습니까?',
        points: [1, 2, 3, 4, 5],
      },
      {
        no: 9,
        question: '빨강, 노랑, 녹색 등 여러 색깔의 채소를 매일 먹습니까?',
        points: [1, 2, 3, 4, 5],
      },
    ],
    group02: [
      {
        no: 1,
        question: '일주일에 5일 이상 아침식사를 합니까?',
        points: [1, 2, 3, 4, 5],
      },
      {
        no: 2,
        question: '편의점 식품, 간식, 등으로 식사를 대신하는 일이 자주 있습니까?',
        points: [5, 4, 3, 2, 1],
      },
      {
        no: 3,
        question: '일주일에 3회 이상 식사를 거릅니까?',
        points: [5, 4, 3, 2, 1],
      },
      {
        no: 4,
        question: '라면, 자장면, 우동 등의 인스턴트 면류를 자주 먹습니까?',
        points: [5, 4, 3, 2, 1],
      },
    ],
    group03: [
      {
        no: 1,
        question: '자장면, 탕수육 등 중국음식을 자주 먹습니까?',
        points: [1, 2, 3, 4, 5],
      },
      {
        no: 2,
        question: '햄버거, 피자, 후라이드 치킨 등 패스트 푸드를 자주 먹습니까?',
        points: [5, 4, 3, 2, 1],
      },
      {
        no: 3,
        question: '육류나 기름지 음식을 자주 먹습니까?',
        points: [5, 4, 3, 2, 1],
      },
      {
        no: 4,
        question: '후라이드 치킨, 감자튀김, 튀김만두, 돈가스 등 튀긴 음식을 자주 먹습니까?',
        points: [5, 4, 3, 2, 1],
      },
      {
        no: 5,
        question: '간식으로 빵, 도너츠, 케일을 자주 먹습니까?',
        points: [5, 4, 3, 2, 1],
      },
      {
        no: 6,
        question: '단 음료(탄산음료, 당이 많은 음료)를 자주 마십니까?',
        points: [5, 4, 3, 2, 1],
      },
    ],
    group04: [
      {
        no: 1,
        question: '가공식품 구입시 식품 영양표시를 확인합니까?',
        points: [1, 2, 3, 4, 5],
      },
      {
        no: 2,
        question: '햄, 소시지, 장조림을 자주 먹습니까?',
        points: [5, 4, 3, 2, 1],
      },
      {
        no: 3,
        question: '감자침, 크래커 등 짠 과자를 자주 먹습니까?',
        points: [5, 4, 3, 2, 1],
      },
      {
        no: 4,
        question: '짜게 먹는 편입니까?',
        points: [5, 4, 3, 2, 1],
      },
    ],
    group05: [
      {
        no: 1,
        question: '다른 사람들보다 식사를 빨리 합니까?',
        points: [5, 4, 3, 2, 1],
      },
      {
        no: 2,
        question: '배고프지 않을 때에도 습관적으로 음식을 먹습니까?',
        points: [5, 4, 3, 2, 1],
      },
      {
        no: 3,
        question: '식사량은 적당합니까?',
        points: [1, 2, 3, 4, 5],
      },
      {
        no: 4,
        question: '식사할 떄 음식을 꼭꼭 씹어 먹나요?',
        points: [1, 2, 3, 4, 5],
      },
      {
        no: 5,
        question: '과식을 합니까?',
        points: [5, 4, 3, 2, 1],
      },
      {
        no: 6,
        question: '음식을 먹고 난 후에 많이 먹었다는 후회를 합니까?',
        points: [5, 4, 3, 2, 1],
      },
      {
        no: 7,
        question: '일정한 시간에 식사를 합니까?',
        points: [1, 2, 3, 4, 5],
      },
      {
        no: 8,
        question: '식사전에 비누를 사용하여 손을 깨끗이 씻습니까?',
        points: [1, 2, 3, 4, 5],
      },
    ],
    group06: [
      {
        no: 1,
        question: '나의 체형에 만족합니까?',
        points: [1, 2, 3, 4, 5],
      },
      {
        no: 2,
        question: '매일 한 시간 이상 적극적으로 신체활동을 합니까?',
        points: [1, 2, 3, 4, 5],
      },
      {
        no: 3,
        question: 'TV시청과 컴퓨터게임을 모두 합해서 하루에 두 시간 이내로 합니까?',
        points: [1, 2, 3, 4, 5],
      },
    ],
  },
};

export default eatingHabitQuestions;
