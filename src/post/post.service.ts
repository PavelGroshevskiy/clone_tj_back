import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { SearchPostDto } from './dto/search-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  create(dto: CreatePostDto) {
    return this.postRepository.save(dto);
  }

  findAll() {
    return this.postRepository.find({ order: { createdAt: 'DESC' } });
  }

  async popular() {
    const qb = this.postRepository.createQueryBuilder();
    qb.orderBy('views', 'DESC');
    qb.limit(10);
    const [items, total] = await qb.getManyAndCount();
    return {
      items,
      total,
    };
  }

  findOne(id: number) {
    this.postRepository
      .createQueryBuilder()
      .whereInIds(id)
      .update()
      .set({ views: () => 'views + 1' })
      .execute();

    return this.postRepository.findOneById(id);
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const find = await this.postRepository.findOneById(id);
    if (!find) {
      throw new NotFoundException('Not Found');
    }
    return this.postRepository.update(id, updatePostDto);
  }

  async remove(id: number) {
    const find = await this.postRepository.findOneById(id);
    if (!find) {
      throw new NotFoundException('Post not found');
    }
    return this.postRepository.delete(id);
  }

  async search(dto: SearchPostDto) {
    const qb = this.postRepository.createQueryBuilder('p');
    qb.limit(dto.limit || 0);
    qb.take(dto.take || 10);
    if (dto.views) {
      qb.orderBy('views', dto.views);
    }

    if (dto.body) {
      qb.andWhere(`p.body ILIKE :body`);
    }
    if (dto.title) {
      qb.andWhere(`p.title ILIKE :title `);
    }
    if (dto.tag) {
      qb.andWhere(`p.tag ILIKE :tag`);
    }
    qb.setParameters({
      title: `%${dto.title}%`,
      body: `%${dto.body}%`,
      tag: `%${dto.tag}%`,
      views: dto.views || 'DESC',
    });
    const [items, total] = await qb.getManyAndCount();

    return {
      items,
      total,
    };
  }
}
