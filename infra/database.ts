export const userTable = new sst.aws.Dynamo("Users", {
  fields: {
    userId: "string",
    createdAt: "string",
    PK: "string",
  },
  primaryIndex: { hashKey: "userId" },
  globalIndexes: {
    CreatedAtIndex: {
      hashKey: "PK",
      rangeKey: "createdAt",
    },
  },
});

export const credTable = new sst.aws.Dynamo("Credentials", {
  fields: {
    email: "string",
  },
  primaryIndex: { hashKey: "email" },
});

export const audioTable = new sst.aws.Dynamo("AudioRecording", {
  fields: {
    audioId: "string",
    userId: "string",
    createdAt: "string",
  },
  primaryIndex: { hashKey: "audioId" },
  globalIndexes: {
    CreatedAtIndex: {
      hashKey: "userId",
      rangeKey: "createdAt",
    },
    UserIndex: {
      hashKey: "userId",
    },
  },
});
export const templateTable = new sst.aws.Dynamo("Template", {
  fields: {
    templateId: "string",
    userId: "string",
    createdAt: "string",
  },
  primaryIndex: { hashKey: "templateId" },
  globalIndexes: {
    CreatedAtIndex: {
      hashKey: "userId",
      rangeKey: "createdAt",
    },
    UserIndex: {
      hashKey: "userId",
    },
  },
});

export const reportTable = new sst.aws.Dynamo("Report", {
  fields: {
    reportId: "string",
    audioId: "string",
    templateId: "string",
    userId: "string",
    createdAt: "string",
  },
  primaryIndex: { hashKey: "reportId" },
  globalIndexes: {
    CreatedAtIndex: {
      hashKey: "userId",
      rangeKey: "createdAt",
    },
    UserIndex: {
      hashKey: "userId",
    },
    AudioIndex: {
      hashKey: "audioId",
    },
    TemplateIndex: {
      hashKey: "templateId",
    },
  },
});
