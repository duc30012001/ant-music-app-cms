export type TMessages = {
  aboutUs: {
    label: string;
    imagePosition: string;
    left: string;
    right: string;
  };
  accessDenied: {
    label: string;
    title: string;
    des: string;
    loginByOtherAccount: string;
  };
  auth: {
    login: string;
  };
  career: {
    candidate: string;
    label: string;
    post: string;
    quantity: string;
    salary: string;
    deadline: string;
    requirement: string;
    benefit: string;
    negotiable: string;
    introduce: string;
    dateApply: string;
    applyNow: string;
    applyForThisJob: string;
    location: string;
    empty: string;
  };
  common: {
    name: string;
    role: string;
    dateCreated: string;
    dateUpdated: string;
    action: string;
    email: string;
    getStarted: string;
    partners: string;
    password: string;
    signIn: string;
    system: string;
    date: string;
    update: string;
    create: string;
    'no.': string;
    delete: string;
    detail: string;
    submit: string;
    newPassword: string;
    oldPassword: string;
    retypePassword: string;
    note: string;
    vi: string;
    en: string;
    userCreator: string;
    slug: string;
    description: string;
    content: string;
    thumbnail: string;
    upload: string;
    logo: string;
    color: string;
    title: string;
    image: string;
    phoneNumber: string;
    address: string;
    from: string;
    to: string;
    upto: string;
    download: string;
    viewAll: string;
    uploadTitle: string;
    onlyAcceptPDF: string;
    scrollToTop: string;
    summary: string;
    pageNotFound: string;
    pageNotFoundTitle: string;
  };
  delete: {
    confirmTitle: string;
    confirmMessage: string;
  };
  company: {
    commonInformation: string;
    history: string;
    label: string;
    name: string;
    representative: string;
    logo: string;
    logoWithName: string;
    logoWithNameDarkMode: string;
    shortName: string;
  };
  contact: {
    label: string;
    subject: string;
    markImportant: string;
    notImportant: string;
    markImportantSuccess: string;
    markNotImportantSuccess: string;
  };
  form: {
    searchPlaceholder: string;
  };
  home: {
    label: string;
    contactUs: string;
    ourService: string;
    goBackHome: string;
  };
  language: {
    english: string;
    label: string;
    vietnamese: string;
  };
  level: {
    label: string;
    placeholder: string;
  };
  message: {
    createSuccessfully: string;
    deleteSuccessfully: string;
    somethingWentWrong: string;
    updateSuccessfully: string;
  };
  news: {
    article: string;
    label: string;
    searchPlaceholder: string;
    relatedNews: string;
    latest: string;
  };
  newsCategory: {
    label: string;
    name: string;
    placeholder: string;
  };
  office: {
    label: string;
    name: string;
    placeholder: string;
  };
  partner: {
    label: string;
    name: string;
  };
  feature: {
    label: string;
    name: string;
    pathname: string;
    location: string;
    icon: string;
    view: string;
    create: string;
    update: string;
    delete: string;
  };
  position: {
    label: string;
    name: string;
    placeholder: string;
  };
  service: {
    label: string;
    description: string;
    ourService: string;
    name: string;
    placeholder: string;
    otherService: string;
  };
  setting: {
    label: string;
  };
  statistic: {
    label: string;
    value: string;
    name: string;
  };
  status: {
    label: string;
    active: string;
    block: string;
    select: string;
  };
  user: {
    label: string;
    admin: string;
    user: string;
    manager: string;
    permission: string;
  };
  userProfile: {
    admin: string;
    changePassword: string;
    information: string;
    logout: string;
    myProfile: string;
    personalInfo: string;
  };
  validation: {
    emailFormat: string;
    select: string;
    radio: string;
    input: string;
    file: string;
    url: string;
    passwordMisMatch: string;
    maxSalaryMustGreater: string;
  };
  website: {
    label: string;
    config: string;
  };
  coreValue: {
    label: string;
  };
  history: {
    label: string;
  };
  video: {
    config: string;
  };
  project: {
    label: string;
  };
  channel: {
    manager: string;
  };
  ERROR_ACCOUNT_PASSWORD_WRONG: string;
  ERROR_PASSWORD_INCORRECT: string;
  ERROR_ACCOUNT_APPROVAL: string;
  ERROR_ACCOUNT_NOT_VERIFY_EMAIL: string;
  ERROR_EMAIL_EXIST: string;
  ERROR_ACCOUNT_LOCK: string;
  INVALID_REQUEST: string;
  ERROR_REFRESH_TOKEN_EXPIRED: string;
  ERROR_REFRESH_TOKEN_INVALID: string;
  ERROR_USER_DUPLICATE: string;
  ERROR_USERNAME_NOT_FORMAT: string;
  ERROR_PASSWORD_NOT_FORMAT: string;
  ERROR_EMAIL_NOT_FOUND: string;
  ERROR_TOKEN_EXPIRED: string;
  ERROR_TOKEN_NOT_FOUND: string;
  ERROR_SERVICE_EXIST_NAME_VI: string;
  ERROR_SERVICE_EXIST_NAME_EN: string;
  ERROR_ABOUT_US_NOT_FOUND: string;
  ERROR_ABOUT_US_EXIST_NAME_VI: string;
  ERROR_ABOUT_US_EXIST_NAME_EN: string;
  ERROR_CANDIDATE_NOT_FOUND: string;
  ERROR_CATEGORIES_EXIT_NAME_VI: string;
  ERROR_CATEGORIES_NOT_FOUND: string;
  ERROR_COMPANY_HISTORY_NOT_FOUND: string;
  ERROR_CONTACT_NOT_FOUND: string;
  ERROR_FUNCTION_NOT_FOUND: string;
  ERROR_FUNCTION_EXIST_PATH: string;
  ERROR_JOB_POSTING_NOT_FOUND: string;
  ERROR_LEVEL_NOT_FOUND: string;
  ERROR_LEVEL_EXIST_NAME_VI: string;
  ERROR_LEVEL_EXIST_NAME_EN: string;
  ERROR_NEWS_NOT_FOUND: string;
  ERROR_NEWS_EXIT_NAME_VI: string;
  ERROR_OFFICE_NOT_FOUND: string;
  ERROR_OFFICE_EXIST_NAME_VI: string;
  ERROR_OFFICE_EXIST_NAME_EN: string;
  ERROR_PARTNER_NOT_FOUND: string;
  ERROR_PARTNER_EXIT_NAME: string;
  ERROR_RECRUITMENT_POSITION_NOT_FOUND: string;
  ERROR_RECRUITMENT_POSITION_EXIST_NAME_VI: string;
  ERROR_RECRUITMENT_POSITION_EXIST_NAME_EN: string;
  ERROR_FORBIDDEN: string;
  ERROR_UNAUTHORIZED: string;
  ERROR_SERVER: string;
  ERROR_DATA_SUBMIT_IS_INVALID: string;
  ERROR_SERVICE_NOT_FOUND: string;
  ERROR_STATISTIC_NOT_FOUND: string;
  ERROR_STATISTIC_EXIT_NAME_VI: string;
  ERROR_STATISTIC_EXIT_NAME_EN: string;
  ERROR_USER_PASSWORD_AND_CONFIRM_PASSWORD_NOT_MATCH: string;
  ERROR_USER_NOT_FOUND: string;
  ERROR_USER_EXIT_EMAIL: string;
};
