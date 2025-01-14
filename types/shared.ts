export type CursorPaginatedResult<T> = {
    data: T[];
    next_cursor: string ;
    per_page: number;
}

export type PaginatedResult<T> = {
    data: T[];
}

export type InifinteQueryPageParam = {
    pageParam: null | string;
}

export type IdParam = {
    id: number
}

export type IImage = {
    id: number;
    file_url: string;
}

export type PagiantionQueryParameter = {
    page: string;
}


export type ListData = {
id: number;
title: string;
};

export type CreateFilePathData = {
url: string;
public_id: string;
};
export type FilePathData = {
url: string;
};
export type ShowFileData = {
uid: number;
url: string;
};
export type UpdateFileData = {
    uid: number | null;
    url: string;
};
export type UploadFileData = {
    file: any;
};
export type UploadFileResponseData = {
    url: string;
    public_id: string;
};
