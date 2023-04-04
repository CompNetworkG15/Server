import { FastifyRequest, FastifyReply } from 'fastify';

interface FileMapper {
  file: Express.Multer.File;
  request: FastifyRequest;
}

export const fileMapper = ({ file, request }: FileMapper) => {
  const image_url = `${request.protocol}://${request.headers.host}/${file.path}`;
  return {
    originalname: file.originalname,
    filename: file.filename,
    image_url,
  };
};
