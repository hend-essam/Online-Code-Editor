import mongoose, { Schema, Document } from "mongoose";
import { Password } from "../services/password";

interface UserAttrs {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  folders?: FolderAttrs[];
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

interface UserDoc extends Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  folders?: FolderDoc[];
}

interface FolderAttrs {
  name: string;
  folders?: FolderAttrs[];
  files?: FileAttrs[];
  parentFolder?: Schema.Types.ObjectId | null;
}

interface FolderModel extends mongoose.Model<FolderDoc> {
  build(attrs: FolderAttrs): FolderDoc;
}

interface FolderDoc extends Document {
  name: string;
  folders?: FolderDoc[];
  files?: FileDoc[];
  parentFolder?: Schema.Types.ObjectId | null;
}

interface FileAttrs {
  name: string;
  content?: string;
}

export interface FileDoc extends Document {
  name: string;
  content: string;
}

interface FileModel extends mongoose.Model<FileDoc> {
  build(attrs: FileAttrs): FileDoc;
}

const fileSchema = new Schema<FileDoc>({
  name: { type: String, required: true },
  content: { type: String, default: "" },
});

const folderSchema = new Schema<FolderDoc>(
  {
    name: { type: String, required: true },
    folders: [{ type: Schema.Types.ObjectId, ref: "Folder" }],
    files: [{ type: Schema.Types.ObjectId, ref: "File" }],
    parentFolder: { type: Schema.Types.ObjectId, ref: "Folder", default: null },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

const userSchema = new Schema<UserDoc>(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    folders: [{ type: Schema.Types.ObjectId, ref: "Folder" }],
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

folderSchema.statics.build = (attrs: FolderAttrs) => {
  return new Folder(attrs);
};

fileSchema.statics.build = (attrs: FileAttrs) => {
  return new File(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);
const Folder = mongoose.model<FolderDoc, FolderModel>("Folder", folderSchema);
const File = mongoose.model<FileDoc, FileModel>("File", fileSchema);

export { User, Folder, File };
