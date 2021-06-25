import { EntityRepository, Repository } from "typeorm";
import { Compliment } from "../entities/Compliments";

@EntityRepository(Compliment)
class ComplimentRepository extends Repository<Compliment> {}

export { ComplimentRepository }