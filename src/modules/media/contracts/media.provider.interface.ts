export interface IMediaProvider {
  upload(file: any): Promise<string>;
}

export const IMediaProvider = Symbol('IMediaProvider');
