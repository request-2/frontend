import { FileInfo, fileInfoToString } from '../Utils/File';
import { comparing } from '../Utils/Func';
import { New, Property, PropertyJSON, Selection } from './Request';

export type FieldValue = string | number | Selection | Selection[] | FileInfo[] | null;

export function decodeSingleChoice(content: string): Selection {
  return { value: content, label: content };
}

export function decodeMultipleChoice(content: string): Selection[] {
  return content.split(';;;').map(decodeSingleChoice);
}

export function decodeNumber(content: string): number {
  return Number.parseFloat(content);
}

export function decodeText(content: string): string {
  return content;
}

export function fieldToProperty(
  acc: New<Property>[],
  [name, value]: [string, FieldValue]
): New<Property>[] {
  if (!value) {
    return [...acc, { name, value: '' }];
  } else if (typeof value === 'string') {
    return [...acc, { name, value }];
  } else if (typeof value === 'number') {
    return [...acc, { name, value: value.toString() }];
  } else if (Array.isArray(value)) {
    if (value.length === 0) {
      return [...acc, { name, value: '' }];
    }

    if ('mime' in value[0]) {
      // The field contains file
      return [
        ...acc,
        ...(value as FileInfo[]).map(f => ({
          name: `${name}/${f.hash}`,
          value: fileInfoToString(f),
        })),
      ];
    } else if ('label' in value[0]) {
      return [...acc, { name, value: (value as Selection[]).map(s => s.value).join(';;;') }];
    }
  } else if (typeof value === 'object' && 'label' in value) {
    return [...acc, { name, value: value.value }];
  }
  throw new Error(`Field -> Property conversion failed: name=${name}, value is above`);
}

// Only groups active properties
function groupFiles(props: PropertyJSON[]): PropertyJSON[] {
  const properties = props
    .filter(p => p.active)
    .sort(comparing(p => p.name))
    .map(p => {
      // WARNING: This is a hack to make sure that the file properties are grouped together
      // For this to keep working, file fields should always include the file hash in their name
      const m = /^(.*)\/.{32}$/u.exec(p.name);
      const name = m ? m[1] : p.name;
      return { ...p, name };
    })
    .reduce<[string | null, PropertyJSON | null, PropertyJSON[]]>(
      ([name, q, acc], p) => {
        if (q && p.name === name) {
          return [name, { ...q, value: `${q.value};;;${p.value}` }, acc];
        }
        return [p.name, p, q ? [...acc, q] : acc];
      },
      [null, null, []]
    );

  return properties[1] ? [...properties[2], properties[1]] : properties[2];
}

export function getDefaultValues(properties: PropertyJSON[]): Record<string, string> {
  //return groupFiles(properties).reduce((acc, p) => ({ ...acc, [p.name]: p.value }), {});
  return Object.fromEntries(groupFiles(properties).map(p => [p.name, p.value]))
}
