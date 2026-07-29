import { type SchemaTypeDefinition } from 'sanity'

import project from './project'
import testimonial from './testimonial'
import booking from './booking'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [project, testimonial, booking],
}
