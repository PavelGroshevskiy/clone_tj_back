import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}

  create(createCommentDto: CreateCommentDto) {
    return this.commentRepository.save({
      text: createCommentDto.text,
      post: { id: createCommentDto.postId },
      user: { id: 1 },
    });
  }

  findAll() {
    return this.commentRepository.find();
  }

  findOne(id: number) {
    return this.commentRepository.findOneById(id);
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return this.commentRepository.update(id, updateCommentDto);
  }

  remove(id: number) {
    return this.commentRepository.delete(id);
  }
}
