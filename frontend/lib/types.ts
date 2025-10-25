//Types for Charts
export type barChartProps = {
    data: {
        [key: string]: number | string,
    }[],
    datakeys: {
        xKey: string,
        barKey: string[] | number[]
    }
}

export type ChartProps = {
    id:number,
    chartType: string,
    chartData: barChartProps
}

//Types for media
export type MediaProps = {
    file: {
        formats: {
            medium: {
                url: string;
                alt: string;
                width: number;
                height: number;
            }
        };
    }
    caption: string;
}

//Types for Table
export type TableProps = {
    tableData: {
        headers: string[],
        rows: {
            [key: string]: string | number
        }[]
    }
}

//Types for Rich Text
export type RichTextProps = {
    body?: string;
}

//Types for Code Block
export type CodeBlockProps = {
    code: string,
    language: string
}

//Types for All Posts

export type AllPostProps = {
    id: number;
    title: string;
    description: string;
    slug: string;
    category: {
        name: string
    };
    author: {
        name: string;
        avatar: {
            formats: {
                small: {
                    url: string;
                }
            }
        }
    };
    cover: {
        formats: {
            medium: {
                url: string;
            }
        }
    };
}