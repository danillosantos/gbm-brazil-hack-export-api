import { Injectable } from '@nestjs/common';
import { getConnection } from 'typeorm';

@Injectable()
export class OrmTransactionsService {

  async saveAll(arrayOfObjects) {
    return this.executeTransaction(arrayOfObjects, "save");
  }

  async removeAll(arrayOfObjects) {
    return this.executeTransaction(arrayOfObjects, "remove");
  }

  async executeTransaction(arrayOfObjects, method) {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      
      for (let i = 0; i < arrayOfObjects.length; i++) {
        await queryRunner.manager[method](
          arrayOfObjects[i]
        );
      }
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      console.log("failed", err);
      throw new Error("Operation failed");
    } finally {
      await queryRunner.release();
    }
  }

}
