import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  DeleteCommand,
  QueryCommand,
  GetCommand,
  PutCommand,
} from "@aws-sdk/lib-dynamodb";

import { Resource } from "sst";
import {
  UserType,
  CredType,
  AudioType,
  ReportType,
  TemplateType,
} from "./types";

const client = DynamoDBDocumentClient.from(new DynamoDBClient({}));

const getItem = async <T extends Record<string, any>>(
  tableName: string,
  idObj: T
) => {
  // console.log("getItem", tableName, idObj);

  const command = new GetCommand({
    TableName: tableName,
    Key: {
      ...idObj,
    },
  });

  // // console.log("getItem", command);

  const data = await client.send(command);
  // // console.log("getItem data", data);

  if (!data.Item) return null;
  return data.Item;
};

const queryItems = async (
  tableName: string,
  indexName: string,
  valueKey: string,
  value: string | number | boolean,
  limit?: number,
  lastEvaluatedKey?: any
): Promise<{ items: any[] | null; lastEvaluatedKey?: any }> => {
  try {
    const command = new QueryCommand({
      TableName: tableName,
      IndexName: indexName,
      KeyConditionExpression: `${valueKey} = :valueKey`,
      ExpressionAttributeValues: {
        ":valueKey": value,
      },
      Limit: limit,
      ExclusiveStartKey: lastEvaluatedKey,
    });
    // console.log("queryItems command", command);
    const data = await client.send(command);

    if (!data.Items) return { items: null };
    return { items: data.Items, lastEvaluatedKey: data.LastEvaluatedKey };
  } catch (error) {
    console.log("getNItems error", error);
    return { items: null };
  }
};

type responseType = {
  isSuccess: boolean;
  msg: string;
};
const createItem = async (
  tableName: string,
  item: any
): Promise<responseType> => {
  // console.log("createItem...");
  const command = new PutCommand({
    TableName: tableName,
    Item: item,
  });

  try {
    await client.send(command);
  } catch (error) {
    console.log("createItem error", error);
    return { isSuccess: false, msg: "error" };
  }

  return { isSuccess: true, msg: "ok" };
};

const deleteItem = async (
  tableName: string,
  idObj: any
): Promise<responseType> => {
  // console.log("deleteItem", tableName, idObj);

  const command = new DeleteCommand({
    TableName: tableName,
    Key: {
      ...idObj,
    },
  });

  // // console.log("deleteItem", command);
  try {
    await client.send(command);
  } catch (error) {
    return { isSuccess: false, msg: "error" };
  }
  // console.log("geleteItem data", data);

  return { isSuccess: true, msg: "deleted" };
};

const db = {
  user: {
    create: async (userProfile: UserType) => {
      const response = await createItem(Resource.Users.name, userProfile);
      if (!response.isSuccess) {
        throw new Error(`Error creating user: ${response.msg}`);
      }
      return response;
    },
    get: async (userId: string): Promise<UserType> => {
      const user = (await getItem(Resource.Users.name, {
        userId,
      })) as UserType;

      return user;
    },
    delete: async (userId: string) => {
      await deleteItem(Resource.Users.name, {
        userId,
      });
    },
  },
  cred: {
    create: async (cred: CredType) => {
      const response = await createItem(Resource.Credentials.name, cred);
      if (!response.isSuccess) {
        throw new Error(`Error creating user: ${response.msg}`);
      }
      return response;
    },
    get: async (email: string): Promise<CredType> => {
      const cred = (await getItem(Resource.Credentials.name, {
        email,
      })) as CredType;

      return cred;
    },
    delete: async (email: string) => {
      await deleteItem(Resource.Credentials.name, {
        email,
      });
    },
  },
  audio: {
    getAll: async (userId: string): Promise<AudioType[]> => {
      const audio = (await queryItems(
        Resource.AudioRecording.name,
        "UserIndex",
        "userId",
        userId
      )) as {
        items: AudioType[];
      };
      return audio.items;
    },
    create: async (audio: AudioType) => {
      const response = await createItem(Resource.AudioRecording.name, audio);
      if (!response.isSuccess) {
        throw new Error(`Error creating user: ${response.msg}`);
      }
      return response;
    },
    get: async (audioId: string): Promise<AudioType | null> => {
      const audio = (await getItem(Resource.AudioRecording.name, {
        audioId,
      })) as AudioType;
      return audio;
    },
    delete: async (audioId: string) => {
      await deleteItem(Resource.AudioRecording.name, {
        audioId,
      });
    },
  },
  report: {
    getAll: async (userId: string): Promise<ReportType[]> => {
      const rep = (await queryItems(
        Resource.Report.name,
        "UserIndex",
        "userId",
        userId
      )) as {
        items: ReportType[];
      };
      return rep.items;
    },
    create: async (rep: ReportType): Promise<responseType> => {
      const response = await createItem(Resource.Report.name, rep);
      if (!response.isSuccess) {
        throw new Error(`Error creating user: ${response.msg}`);
      }
      return response;
    },
    get: async (reportId: string): Promise<ReportType | null> => {
      const rep = (await getItem(Resource.Report.name, {
        reportId,
      })) as ReportType;
      return rep;
    },
    delete: async (reportId: string) => {
      await deleteItem(Resource.Report.name, {
        reportId,
      });
    },
  },
  template: {
    getAll: async (userId: string): Promise<TemplateType[]> => {
      const rep = (await queryItems(
        Resource.Template.name,
        "UserIndex",
        "userId",
        userId
      )) as {
        items: TemplateType[];
      };
      return rep.items;
    },
    create: async (rep: TemplateType): Promise<responseType> => {
      const response = await createItem(Resource.Template.name, rep);
      if (!response.isSuccess) {
        throw new Error(`Error creating user: ${response.msg}`);
      }
      return response;
    },
    get: async (templateId: string): Promise<TemplateType | null> => {
      const rep = (await getItem(Resource.Template.name, {
        templateId,
      })) as TemplateType;
      return rep;
    },
    delete: async (templateId: string) => {
      await deleteItem(Resource.Template.name, {
        templateId,
      });
    },
  },
};

export default db;
