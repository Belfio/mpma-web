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
