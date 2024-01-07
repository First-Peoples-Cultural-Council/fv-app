import { MTDExportFormat } from '@mothertongues/search';

// This is the data retrieved from https://fv-be-preprod.eks.firstvoices.io/api/1.0/sites/gitsenimx/mtd-data
// This endpoint contains four keys:
//      1. 'l1_index' - the inverted index for l1
//      2. 'l2_index' - the inverted index for l2 (English)
//          You likely won't need to do anything with 1 & 2, but they are required by the search algorithm.
//      3. 'data' - the list of dictionary entries
//          This has the type DictionaryEntryExportFormat[]. You can import the type definition @mothertongues/search.
//          This data can/should fully replace the data in temp-word-list.tsx.
//      4. 'config'   - configuration information for the dictionary
//          It sounds like you are querying config information elsewhere, but this is also needed by the search algorithm. You might find some useful metadata in here that could reduce the number of queries you need to make.

//
//
import * as gitData from './gitsenimx.json';

export const mtdData = gitData as unknown as MTDExportFormat;
