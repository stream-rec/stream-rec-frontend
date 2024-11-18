import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import {createHash} from "crypto";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const md5 = (input: string): string => {
  return createHash('md5').update(input).digest('hex');
};