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
 */import { Tag } from './tag';


export interface Challenge { 
    id?: number;
    title?: string;
    description?: string;
    tags?: Array<Tag>;
    sportPoints?: number;
    nutritionPoints?: number;
    mentalPoints?: number;
}