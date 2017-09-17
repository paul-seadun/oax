import {Schema} from 'swagger-schema-official';
import {IOperationExtended} from '../interfaces/IOperationExtended';

export function schema(operation: IOperationExtended) {
  for (const code in operation.responses) {
    if (operation.responses.hasOwnProperty(code)) {
      const response = operation.responses[code];

      if (response.schema) {
        return response.schema;
      }
    }
  }
}

export function value(schemaObject: Schema): any {
  if (schemaObject.example) {
    return schemaObject.example;
  }

  const typeValue = schemaObject.format || schemaObject.type || (schemaObject.enum ? 'enum' : null);

  switch (typeValue) {
    case 'int32':
    case 'int64':
    case 'integer':
      return 0;
    case 'float':
    case 'double':
    case 'number':
      return 0.5;
    case 'string':
      return schemaObject.enum ? schemaObject.enum[0] : 'string';
    case 'byte':
      return btoa('string');
    case 'binary':
      return 'binary';
    case 'boolean':
      return false;
    case 'date':
      return (new Date(0)).toISOString().split('T')[0];
    case 'date-time':
      return (new Date(0)).toISOString();
    case 'password':
      return 'password';
    case 'enum':
      return schemaObject.enum[0];
    default:
      console.warn('Unknown schema value', schemaObject);
      return '?';
  }
}

export function type(schemaObject: Schema): any {
  const typeValue = schemaObject.format || schemaObject.type || (schemaObject.enum ? 'enum' : null);

  switch (typeValue) {
    case 'int32':
    case 'int64':
    case 'integer':
    case 'float':
    case 'double':
    case 'number':
      return 'number';
    case 'string':
    case 'byte':
    case 'binary':
      return 'string';
    case 'boolean':
      return 'boolean';
    case 'date':
      return 'date';
    case 'date-time':
      return 'date-time';
    case 'password':
      return 'password';
    case 'file':
      return 'file';
    case 'enum':
      return 'enum';
  }

  return typeValue;
}
