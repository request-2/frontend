export type File = { hash: string; name: string; mime: string };

export function fileToString(f: File): string {
  return `${f.hash}:${f.mime}:${f.name}`;
}

export function stringToFile(s: string): File {
  const fields = s.split(':');
  return { hash: fields[0], mime: fields[1], name: fields[2] };
}
