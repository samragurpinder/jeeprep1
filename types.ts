export enum TopicStatus {
    NotStarted = 'Not Started',
    InProgress = 'In Progress',
    Completed = 'Completed',
    Revise = 'Revise'
}

// Sub-topic level
export interface Subtopic {
    name: string;
    status: TopicStatus;
    coachingStatus: TopicStatus;
}

// New: Major Topic level to group subtopics within a chapter
export interface MajorTopic {
    name:string;
    subtopics: Subtopic[];
}

// Chapter level progress details
export interface ChapterProgress {
    level1: boolean;
    level2: boolean;
    mains: boolean;
    advanced: boolean;
    pyqs: boolean;
    pyqsCount: number;
}

export interface Chapter {
    name: string;
    status: TopicStatus;
    coachingStatus: TopicStatus;
    progress: ChapterProgress;
    majorTopics: MajorTopic[]; // Changed from subtopics
}

// Subject structure
export interface ChemistrySection {
    name: 'Physical Chemistry' | 'Inorganic Chemistry' | 'Organic Chemistry';
    chapters: Chapter[];
}

export interface PhysicsSubject {
    name: 'Physics';
    chapters: Chapter[];
}

export interface ChemistrySubject {
    name: 'Chemistry';
    sections: ChemistrySection[];
}

export interface MathSubject {
    name: 'Math';
    chapters: Chapter[];
}

export type SubjectData = PhysicsSubject | ChemistrySubject | MathSubject;
export type SubjectName = 'Physics' | 'Chemistry' | 'Math';


// Test Tracking
export type TestType = 'JEE Mains' | 'JEE Advanced' | 'Board';

export interface TestSyllabusItem {
    subject: string;
    chapter: string;
}

export interface TestResult {
    id: string;
    name: string;
    date: string;
    type: TestType;
    marks: {
        physics: number;
        chemistry: number;
        math: number;
    };
    negativeMarks: {
        physics: number;
        chemistry: number;
        math: number;
    };
    totalMarks: number; // Max marks
    syllabus: TestSyllabusItem[];
    customSyllabus: string;
    analysisDone: boolean;
    feedback: string;
    learnings: string;
    testPdfFilename?: string;
    testPdfDataUrl?: string;
    classRank?: number | null;
    testScope?: string;
}


// --- New Advanced Daily Planner Structure ---
export interface PlannedTopic {
    id: string;
    subject: SubjectName;
    chapterName: string;
    isFullChapter: boolean; // True if 'All Topics' is selected
    subtopicNames: string[];
    note: string;
    status: 'Pending' | 'Completed' | 'Incomplete';
    isCarriedOver?: boolean;
}

export interface HourlySlot {
    id: string;
    startTime: string;
    endTime: string;
    plannedTopicId: string | null; // Links to a topic, task, or lecture
    subject: SubjectName | null;
    status: 'Pending' | 'Completed' | 'Incomplete';
}

export interface DailyPlanTask {
    id: string;
    text: string;
    status: 'Pending' | 'Completed' | 'Incomplete';
    isCarriedOver?: boolean;
}

export interface QuestionsSolvedLog {
    id: string;
    subject: SubjectName;
    chapter: string;
    count: number;
    type: 'Basic' | 'Mains' | 'Advanced';
}

export interface DailyPlan {
    date: string; // YYYY-MM-DD
    subjectPlans: {
        Physics: PlannedTopic[];
        Chemistry: PlannedTopic[];
        Math: PlannedTopic[];
    };
    schedule: HourlySlot[];
    tasks: DailyPlanTask[];
    isReviewed: boolean; // To check if end-of-day review is done
    wakeUpTime: string; // e.g., "06:00"
    sleepTime: string; // e.g., "23:00"
    dailyMood?: number | null; // 1-5, similar to wellness log mood
    questionsSolved: QuestionsSolvedLog[];
}

export interface Lecture {
    id: string;
    title: string;
    url: string;
    videoId: string;
    subject: SubjectName;
    chapter: string;
    category: 'Question Practice' | 'Theory' | 'Concepts' | 'Other';
    dateAdded: string; // ISO string
}


export interface CalendarEvent {
    id:string;
    date: string; // YYYY-MM-DD
    title: string;
    time?: string; // Optional time for the event
    type: 'test' | 'revision' | 'study' | 'other';
}

export interface UpcomingTest {
    id: string;
    name: string;
    date: string; // YYYY-MM-DD
    time: string; // HH:MM
    type: TestType;
    totalMarks: number;
    targetMarks: number;
    syllabus: TestSyllabusItem[];
    customSyllabus: string;
    testScope?: string;
}

// New Wellness Log type
export interface WellnessLog {
    date: string; // YYYY-MM-DD
    mood: number; // 1-5 (e.g., 1: Terrible, 5: Great)
    sleepHours: number;
    journal?: string;
}

// --- New Doubt Journal Type ---
export interface Doubt {
    id: string;
    subject: SubjectName;
    topic: string; // Could be a chapter or a subtopic name
    description: string;
    date: string; // YYYY-MM-DD
    status: 'Cleared' | 'Still Confusing';
    context?: string; // e.g., From Prof. X's class
}


// --- Gamification Types ---
export interface Achievement {
    id: string; // e.g., 'consistency-king'
    name: string;
    description: string;
    unlockedDate: string; // ISO string
    icon: string;
}

export type ChallengeType = 'study_hours' | 'completed_topics' | 'questions_solved';
export type ChallengeStatus = 'active' | 'completed' | 'failed';

export interface StudyChallenge {
    id: string;
    title: string;
    type: ChallengeType;
    goal: number;
    current: number;
    unit: string; // 'hours' or 'topics' or 'questions'
    durationDays: number;
    startDate: string; // ISO string
    endDate: string; // ISO string
    status: ChallengeStatus;
}

export type RankTier = 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
export interface Rank {
    name: string; // 'Explorer I'
    level: number; // 1-12
    score: number; // The performance score (0-100)
    tier: RankTier;
}

// --- NEW Coaching Log Types ---
export type CoachingActivityType = 'lecture' | 'test' | 'other';

export interface CoachingLecture {
    id: string;
    type: 'lecture';
    startTime: string; // "HH:mm"
    endTime: string; // "HH:mm"
    subject: SubjectName;
    teacher: string;
    category: 'Theory' | 'Concepts' | 'Questions' | 'Doubt' | 'Motivation/Strategies' | 'Combined' | 'Other';
    chapter: string;
    subtopicsTaught: string[];
    remarks: string;
    rating: number; // 1-5
    homework: string;
    doubts: string;
}

export interface CoachingTestActivity {
    id: string;
    type: 'test';
    upcomingTestId: string | null; // Link to an upcoming test
    testResultId: string | null; // Link to a test from history
    testName: string; // A custom name if not linked
    startTime: string; // "HH:mm"
    endTime: string; // "HH:mm"
}

export interface CoachingOtherActivity {
    id: string;
    type: 'other';
    description: string;
    startTime: string; // "HH:mm"
    endTime: string; // "HH:mm"
}


export type CoachingLogActivity = CoachingLecture | CoachingTestActivity | CoachingOtherActivity;

export interface CoachingLog {
    date: string; // YYYY-MM-DD
    activities: CoachingLogActivity[];
    motivation: number; // 1-5
}

// Main User Object
export interface User {
    uid: string;
    email: string;
    displayName: string;
    studyStreak: number;
    lastLogin: string;
    topics: {
        physics: PhysicsSubject;
        chemistry: ChemistrySubject;
        math: MathSubject;
    };
    tests: TestResult[];
    upcomingTests: UpcomingTest[];
    notes: string;
    dailyPlans: DailyPlan[];
    lectures: Lecture[];
    events: CalendarEvent[];
    dailyQuote: {
        quote: string;
        date: string;
    };
    wellnessLogs: WellnessLog[];
    doubts: Doubt[];
    teachers: string[];
    coachingLogs: CoachingLog[];
    // Gamification
    achievements: Achievement[];
    challenges: StudyChallenge[];
    rank: Rank;
    lastRankUpdate: string; // ISO string
    personalBestStudyHours: number;
}

export type AppView = 'dashboard' | 'topics' | 'tests' | 'lectures' | 'notes' | 'reports' | 'coaching';

// --- Types for Advanced Reports ---
export interface ReportHourlySlot extends HourlySlot {
    activityName: string;
    activityType: 'topic' | 'task' | 'activity' | 'free' | 'lecture' | 'coaching';
}

export interface DailyBreakdownItem {
    date: string;
    studyHours: number;
    coachingHours: number;
    breakHours: number;
    efficiency: number | null;
    topicsStudied: string[];
    schedule: ReportHourlySlot[];
    wellness: WellnessLog | null;
    questionsSolved: QuestionsSolvedLog[];
    coachingActivities: CoachingLogActivity[];
};

export interface ChapterwiseMetrics {
    [chapterName: string]: {
        subject: SubjectName;
        questions: { Basic: number, Mains: number, Advanced: number };
        totalQuestions: number;
        hours: number;
        tests: { id: string, name: string, score: number, totalMarks: number, date: string, scorePercent: number }[];
        avgTestScore: number | null;
    }
}

export interface TeacherMetrics {
    [teacherName: string]: {
        ratings: number[],
        avgRating: number,
        classCount: number,
        totalHours: number,
        doubtsCleared: number;
    }
}

export interface ReportData {
    // General
    title: string;
    dateRange: string;
    
    // Dashboard KPIs
    totalStudyHours: number;
    totalCoachingHours: number;
    totalQuestionsSolved: number;
    testsTakenCount: number;
    avgMood: number | null;
    avgSleep: number | null;
    avgEfficiency: number | null;

    // Dashboard Graphs
    dailyPerformanceTrend: { date: string, studyHours: number, coachingHours: number, questions: number, efficiency: number | null }[];
    subjectTimeDistribution: { name: SubjectName, value: number }[];
    questionTypeDistribution: { name: string, Basic: number, Mains: number, Advanced: number }[];

    // Time Analysis
    hourlyActivityHeatmap: { hour: string, values: (number|null)[] }[];
    activityHeatmapLabels: string[]; // For legend
    dailyHoursBreakdown: { date: string, selfStudy: number, coaching: number, breaks: number }[];

    // Test Analysis
    testPerformanceTrend: { date: string, name: string, score: number, totalMarks: number, percentage: number, negative: number }[];
    subjectWiseTestPerformance: { name: SubjectName, avgScore: number }[];
    negativeMarksAnalysis: { negative: number, percentage: number }[];
    weakestChapters: { name: string, avgScore: number, subject: SubjectName }[];
    strongestChapters: { name: string, avgScore: number, subject: SubjectName }[];
    
    // Topic Analysis
    syllabusCoverageTrend: { date: string, count: number }[];
    chapterMetrics: ChapterwiseMetrics;
    chapterTimeMetrics: { subject: SubjectName, data: { name: string, value: number }[] }[];
    chapterQuestionMetrics: { subject: SubjectName, data: { name: string, value: number }[] }[];
    chapterTestMetrics: { subject: SubjectName, data: { name: string, value: number }[] }[];
    
    // Coaching & Wellness Analysis
    teacherMetrics: TeacherMetrics;
    homeworkCompletionRate: number | null;
    wellnessTrend: { date: string, mood: number | null, sleep: number | null, efficiency: number | null }[];
    doubtDistribution: { name: SubjectName | 'Cleared' | 'Still Confusing', value: number }[];
    teacherLectureCount: { name: string, count: number }[];
    teacherRatingDistribution: { name: string, '1': number, '2': number, '3': number, '4': number, '5': number }[];
    coachingSubjectDistribution: { name: SubjectName, value: number }[];
    lectureCategoryDistribution: { name: string, value: number }[];
    motivationVsCoaching: { date: string, motivation: number | null, hours: number }[];


    // Raw data for detailed views
    dailyBreakdown: DailyBreakdownItem[];
    testsTaken: TestResult[];
}