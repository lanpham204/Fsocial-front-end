import { File } from "../responses/file";
import { Image } from "../responses/image";

export class PostResponse {
  id: string;
  content: string;
  userId: string;
  files: File[];
  images: Image[];
  createdAt: Date;
  updatedAt: Date;
  majorId: string;
  active: boolean;

  constructor(
    id: string,
    content: string,
    userId: string,
    files: File[],
    images: Image[],
    createdAt: Date,
    updatedAt: Date,
    majorId: string,
    active: boolean
  ) {
    this.id = id;
    this.content = content;
    this.userId = userId;
    this.files = files;
    this.images = images;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.majorId = majorId;
    this.active = active;
  }
}
