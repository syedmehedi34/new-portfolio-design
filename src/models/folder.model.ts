// src/models/folder.model.ts
import { Schema, models, model, Types } from "mongoose";

export interface IFolder {
  _id: Types.ObjectId;
  name: string;
  parentId: Types.ObjectId | null; // nested folder er jonno - null hole root folder
  color: string; // sidebar/card e visually distinguish korar jonno
  order: number; // drag-reorder korle sort korার jonno
  logo?: string; // folder er logo
  createdAt: Date;
  updatedAt: Date;
}

const FolderSchema = new Schema<IFolder>(
  {
    name: { type: String, required: true, trim: true },
    parentId: { type: Schema.Types.ObjectId, ref: "Folder", default: null },
    color: { type: String, default: "#5B6BF5" },
    order: { type: Number, default: 0 },
    logo: { type: String },
  },
  { timestamps: true },
);

FolderSchema.index({ parentId: 1, order: 1 });

const Folder = models.Folder || model<IFolder>("Folder", FolderSchema);
export default Folder;
