export enum accessLevelEnum {
  public = "1",
  private = "2",
};

export enum authProviderEnum {
  credentials = 'credentials',
  google = 'google',
  facebook = 'facebook',
};

export enum userRoleEnum {
  admin = 'admin',
  instructor = 'instructor',
  student = 'student',
};

export enum courseTypeEnum {
  selfStudy = '1',
  liveSession = '2',
  examSimulation = '3',
  classRoom = '4',
};

export enum questionTypeEnum {
  single,
  multiple
}

export enum SessionContentTypeEnum {
  selfReading = "1",
  watchVideo = "2",
  exam = "3"
}

export enum ExamOptionsEnum {
  noExam = "1",
  examIncluded = "2",
  optionalExam = "3"
}

export type FAQ = {
  textAr: string,
  textEn: string,
  answerAr: string,
  answerEn: string
}

export enum BlobTypeEnum {
  image = "1",
  file = "2"
}
