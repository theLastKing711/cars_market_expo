export function buildEmptyObject<T extends Record<string, string|string[]>>(obj: any): T
{
    const typedObject: T = 
        Object.entries(obj).map( ([key, value])  => {
            const x = {} as any;
            if(typeof value == 'string')
                x[key] = ''
            else 
                x[key] = [];
            
            return x;
        }) as any as T;

    return typedObject;
}

export function buildQueryParamsString<T,K extends keyof T = keyof T>(params: {key: K, value: string|string[]}[]) {
    
    const stringQueryParm = params.reduce((prev, {key: currentKey, value: currentValue}, index) => {

        const currentKeyAsString = currentKey as string; 

        if(typeof currentValue !== "string")
        {
            
            const query = currentValue.reduce(
                (prevArray, currentArrayItem) => {

                    console.log(prevArray);
                    
                    
                    if(prevArray != "")
                    {
                        return `${prevArray}&${currentKeyAsString}[]=${currentArrayItem}`;
                    }

                    if(index == 0)
                    {
                        return `?${currentKeyAsString}[]=${currentArrayItem}`;
                    }

                    return `${prevArray}&${currentKeyAsString}[]=${currentArrayItem}`;
                }
                , 
                prev
            );

            return query;
        }

        if(currentValue == "")
        {
            console.log('empty');
            
            return prev;
        }

        if(prev == "" && currentValue == "")
            {
                return prev;
            }
    

        if(index == 0)
        {
            if(currentValue != "")
            {
                console.log(currentValue, "sex");
                
                return `?${currentKeyAsString}=${currentValue}`;
            }
        }

        if(prev == "" && currentValue != "")
        {
            return `${prev}&${currentKeyAsString}=${currentValue}`;
        }

        if(prev != "" && currentValue != "")
        {
            return `${prev}&${currentKeyAsString}=${currentValue}`;
        }
        
        return prev;

    }, "");
    
    console.log(stringQueryParm, 'stringQueryParam');
    

    return stringQueryParm;

}