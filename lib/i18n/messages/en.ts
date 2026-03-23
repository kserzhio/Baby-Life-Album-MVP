const en = {
  common: {
    appName: "Baby Life Album",
    appDescription: "Moments, milestones, and growth in one cozy place.",
    addMemory: "Add Memory",
    reset: "Reset",
    noData: "No data",
    save: "Save",
    optional: "optional",
    language: "Language",
    english: "English",
    ukrainian: "Ukrainian"
  },
  navigation: {
    dashboard: "Dashboard",
    timeline: "Timeline",
    addMemory: "Add Memory",
    growth: "Growth Tracker"
  },
  sidebar: {
    title: "Family Keepsake",
    description: "A warm private space for firsts and favorites."
  },
  categories: {
    FIRST_SMILE: "First Smile",
    FIRST_TOOTH: "First Tooth",
    FIRST_STEPS: "First Steps",
    FIRST_WORD: "First Word",
    DOCTOR_VISIT: "Doctor Visit",
    PHOTO_MEMORY: "Photo Memory",
    MILESTONE: "Milestone"
  },
  age: {
    newborn: "Newborn",
    month: "month",
    months: "months",
    year: "year",
    years: "years"
  },
  dashboard: {
    eyebrow: "Dashboard",
    title: "Welcome back to {name}'s album",
    description: "A quick view of milestones, recent memories, and the latest growth update.",
    currentAge: "Current Age",
    bornOn: "Born on {date}",
    memoriesSaved: "Memories Saved",
    memoriesSavedHint: "A growing timeline of family firsts.",
    growthEntries: "Growth Entries",
    growthEntriesHint: "Measurements from checkups and home updates.",
    latestWeight: "Latest Weight",
    loggedOn: "Logged on {date}",
    addGrowthToBegin: "Add a growth entry to begin.",
    familySnapshot: "Family Snapshot",
    snapshotDescription:
      "Keep milestones, doctor notes, and favorite photo memories together in one calm, private place that feels easy to maintain.",
    birthDate: "Birth date",
    latestHeight: "Latest height",
    viewGrowthTracker: "View growth tracker",
    topCategories: "Top categories",
    recentActivity: "Recent activity",
    recentActivityDescription: "The newest milestones saved to the family timeline.",
    noRecentMemories: "No recent memories",
    noRecentMemoriesDescription: "Once you save a memory, it will show up here.",
    featuredMemories: "Featured memories",
    featuredMemoriesDescription: "A quick glance at the moments that make the album feel alive.",
    openFullTimeline: "Open full timeline",
    noChildProfile: "No child profile found",
    noChildProfileDescription: "Seed the database or add a profile to start tracking memories and growth."
  },
  timeline: {
    eyebrow: "Timeline",
    title: "A timeline of firsts and favorite moments",
    description: "Every entry includes what happened, when it happened, and how old your child was at the time.",
    emptyTitle: "No memories yet",
    emptyDescription: "Start the album with a first smile, a doctor visit, or a favorite photo memory.",
    emptyAction: "Add the first memory"
  },
  memoryForm: {
    eyebrow: "Add Memory",
    title: "Save a moment while it is still fresh",
    description: "Capture a milestone, photo memory, or doctor visit with just enough detail to make it meaningful later.",
    cardTitle: "Add a new memory",
    cardDescription: "Capture one special moment at a time with the details you want to remember later.",
    titleLabel: "Title",
    titlePlaceholder: "First steps across the living room",
    categoryLabel: "Category",
    eventDateLabel: "Event date",
    imageUrlLabel: "Image URL (optional)",
    imageUrlPlaceholder: "https://example.com/photo.jpg",
    descriptionLabel: "Description",
    descriptionPlaceholder: "Write down what happened and why it mattered...",
    submit: "Save memory",
    submitting: "Saving memory...",
    createProfileFirst: "Create a child profile before adding memories.",
    validationMessage: "Please fix the highlighted fields."
  },
  growth: {
    eyebrow: "Growth Tracker",
    title: "Track height and weight over time",
    description: "A simple tracker for measurements, checkup notes, and progress between visits.",
    formTitle: "Add a growth entry",
    formDescription: "Keep height and weight records tidy so trends are easy to spot over time.",
    dateLabel: "Date",
    heightLabel: "Height (cm)",
    weightLabel: "Weight (kg)",
    notesLabel: "Notes",
    notesPlaceholder: "Any context from the visit or changes you want to remember...",
    submit: "Save growth entry",
    submitting: "Saving entry...",
    historyTitle: "Growth history",
    emptyTitle: "No growth entries yet",
    emptyDescription: "Add the first measurement to start building a simple growth history.",
    trend: "Trend",
    baseline: "Baseline",
    noNotes: "No notes added.",
    createProfileFirst: "Create a child profile before adding growth entries.",
    validationMessage: "Please fix the highlighted fields.",
    addGrowthEntry: "Add a growth entry"
  },
  memoryCard: {
    eventDateFallback: "Unknown date"
  },
  table: {
    date: "Date",
    height: "Height",
    weight: "Weight",
    notes: "Notes"
  },
  validation: {
    titleMin: "Title must be at least 2 characters.",
    eventDateRequired: "Please select an event date.",
    descriptionMin: "Description should be at least 10 characters.",
    imageUrlInvalid: "Image URL must be valid.",
    recordedAtRequired: "Please select a date.",
    heightPositive: "Height must be greater than 0.",
    weightPositive: "Weight must be greater than 0."
  }
} as const;

export default en;
