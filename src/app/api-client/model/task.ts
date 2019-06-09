/**
 * Challenge Box
 * Challenge Box API
 *
 * OpenAPI spec version: 1.0
 * Contact: beispielemail@beispiel.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */import { Challenge } from './challenge';
import { Venturer } from './venturer';


export interface Task { 
    id?: number;
    accepted?: Date;
    done?: Date;
    beaten?: Date;
    failed?: Date;
    challenge?: Challenge;
    venturer?: Venturer;
}