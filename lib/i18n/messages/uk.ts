const uk = {
  meta: {
    title: "Baby Tracker Pro",
    description: "Швидко фіксуйте годування, сон, підгузки та нотатки."
  },
  common: {
    appName: "Baby Tracker Pro",
    appDescription: "Швидкий трекер для новонароджених.",
    language: "Мова",
    english: "EN",
    ukrainian: "UA",
    signOut: "Вийти",
    signedInAs: "Увійшли як {email}"
  },
  navigation: {
    dashboard: "Головна",
    babies: "Діти",
    timeline: "Стрічка",
    growth: "Ріст"
  },
  auth: {
    badge: "Зручно однією рукою",
    title: "Фіксуйте важливе без зайвих дій.",
    description: "Увійдіть через email, і ми надішлемо безпечне magic link посилання.",
    emailLabel: "Email",
    emailPlaceholder: "parent@example.com",
    submit: "Надіслати magic link",
    submitting: "Надсилаємо...",
    checkEmail: "Перевірте пошту, щоб увійти.",
    error: "Не вдалося надіслати посилання для входу."
  },
  dashboard: {
    title: "Швидкий запис на сьогодні",
    description: "Швидкі дії для годування, сну, підгузків і нотаток.",
    babiesTitle: "Ваші діти",
    recentTitle: "Остання активність",
    onboardingTitle: "Додайте першу дитину",
    onboardingDescription: "Після створення профілю можна швидко логувати годування, сон, підгузки й нотатки.",
    onboardingStepOne: "Створіть профіль дитини з ім'ям і датою народження.",
    onboardingStepTwo: "Поверніться сюди, щоб логувати події однією рукою.",
    quickActionsTitle: "Швидкі дії",
    summarySubtitle: "Зріз за сьогодні",
    emptyTitle: "Сьогодні ще немає подій",
    emptyDescription: "Скористайтеся швидкою формою нижче, щоб додати першу подію.",
    addBabyHint: "Спочатку створіть профіль дитини, щоб зберігати події.",
    totalBabies: "Діти",
    feedingCount: "Годування",
    sleepCount: "Сон",
    diaperCount: "Підгузки",
    noteCount: "Нотатки",
    growthCount: "Вимірювання",
    growthTitle: "Трекер росту",
    growthDescription: "Останні вага та зріст для кожної дитини.",
    openGrowth: "Відкрити ріст",
    noGrowthYet: "Ще немає записів росту."
  },
  babies: {
    title: "Діти",
    description: "Прості профілі, щоб логування було швидким.",
    formTitle: "Додати дитину",
    formDescription: "Лише найважливіше.",
    emptyTitle: "Ще немає дітей",
    emptyDescription: "Створіть перший профіль, щоб увімкнути трекінг.",
    eventsCount: "{count} подій",
    nameLabel: "Ім'я",
    namePlaceholder: "Софія",
    birthDateLabel: "Дата народження",
    submit: "Додати дитину",
    submitting: "Додаємо..."
  },
  timeline: {
    title: "Стрічка",
    description: "Події згруповані за днями, щоб було легше бачити ритм.",
    dayTotal: "{count} подій",
    emptyTitle: "Ще немає подій",
    emptyDescription: "Після додавання подій вони з’являться тут."
  },
  growth: {
    title: "Ріст",
    description: "Заносьте вагу й зріст, щоб легко бачити зміни з часом.",
    babyLabel: "Дитина",
    recordedAtLabel: "Час вимірювання",
    weightLabel: "Вага (кг)",
    heightLabel: "Зріст (см)",
    noteLabel: "Нотатка",
    notePlaceholder: "Необов'язковий коментар із візиту чи домашнього вимірювання",
    submit: "Зберегти ріст",
    submitting: "Зберігаємо...",
    historyTitle: "Історія вимірювань",
    emptyTitle: "Ще немає записів росту",
    emptyDescription: "Додайте перше вимірювання ваги та зросту, щоб почати трекінг.",
    weightUnit: "кг",
    heightUnit: "см",
    noteFallback: "Без нотатки."
  },
  eventForm: {
    title: "Швидка подія",
    description: "Створено для одного великого пальця і мінімуму дій.",
    babyLabel: "Дитина",
    typeLabel: "Тип події",
    startedAtLabel: "Початок",
    endedAtLabel: "Кінець",
    amountMlLabel: "Кількість (мл)",
    feedingMethodLabel: "Спосіб годування",
    diaperTypeLabel: "Тип підгузка",
    noteLabel: "Нотатка",
    notePlaceholder: "Коротка нотатка за потреби",
    amountPresetsLabel: "Швидкий обсяг",
    sleepNowLabel: "Поставити кінець на зараз",
    submit: "Зберегти подію",
    submitting: "Зберігаємо...",
    types: {
      FEEDING: "Годування",
      SLEEP: "Сон",
      DIAPER: "Підгузок",
      NOTE: "Нотатка"
    },
    feedingMethods: {
      BREAST: "Груди",
      BOTTLE: "Пляшка",
      FORMULA: "Суміш"
    },
    diaperTypes: {
      WET: "Мокрий",
      DIRTY: "Брудний",
      MIXED: "Змішаний"
    }
  },
  events: {
    noNote: "Без нотатки",
    feedingSummary: "{method} • {amount} мл",
    diaperSummary: "{diaperType} підгузок",
    sleepSummary: "Сон {duration}",
    noteSummary: "Додано нотатку",
    countLabel: "{count} {label}"
  },
  validation: {
    emailInvalid: "Введіть коректну email адресу.",
    nameMin: "Ім'я має містити щонайменше 2 символи.",
    birthDateRequired: "Дата народження обов'язкова.",
    babyIdRequired: "Оберіть дитину.",
    recordedAtRequired: "Час вимірювання обов'язковий.",
    startedAtRequired: "Час початку обов'язковий.",
    endedAtInvalid: "Час завершення має бути пізніше за початок.",
    amountPositive: "Кількість має бути більшою за 0.",
    weightPositive: "Вага має бути більшою за 0.",
    heightPositive: "Зріст має бути більшим за 0.",
    noteMax: "Нотатка занадто довга."
  }
} as const;

export default uk;
