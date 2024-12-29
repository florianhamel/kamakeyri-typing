import { WikiSummary } from '../../domain/types/wiki.types';
import { WikiDTO } from '../DTOs/wiki.dto';

export function toWikiSummary(value: WikiDTO): WikiSummary {
  return { extract: value.extract, title: value.titles.normalized };
}
