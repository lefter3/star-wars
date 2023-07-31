import { HttpCode, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';

export default class Resources<T> {
  private url = 'https://swapi.dev/api/';

  constructor(private readonly repository: Model<T>) {}

  findOne = async (query) => {
    return this.repository.findOne(query);
  };

  createOrSet = async (query: any, count: number) => {
    if (count < 0) {
      return 
      // throw new Error('Cannot set a negative amount');
    }
    const update = { count };
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };
    return this.repository.findOneAndUpdate(query, update, options);
  };

  updateCountOrCreate = async (query: any, increment: number) => {
    if (increment < 0) query.count = { $gte: increment * -1 };
    const update = { $inc: { count: increment } };
    try {
      let options: any = {
        new: true,
        runValidators: true
      }
      options.upsert = increment > 0;
      return this.repository.findOneAndUpdate(query, update, options);
    } catch(err) {
      return new HttpException("Resource was not updated", HttpStatus.BAD_REQUEST)
    }

  };

  getResources = async (resource, page) => {
    return fetch(this.url + resource + `?page=${page}`)
      .then(function (res) {
        return res.text();
      })
      .then(function (data) {
        return data;
      });
  };

  getResource = async (resource, id) => {
    return fetch(this.url + resource + `/${id}`)
      .then(function (res) {
        return res.text();
      })
      .then(function (data) {
        return data;
      });
  };
}
