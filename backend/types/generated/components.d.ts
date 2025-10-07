import type { Schema, Struct } from '@strapi/strapi';

export interface SharedCharts extends Struct.ComponentSchema {
  collectionName: 'components_shared_charts';
  info: {
    displayName: 'Charts';
    icon: 'chartPie';
  };
  attributes: {
    chartData: Schema.Attribute.JSON;
    chartType: Schema.Attribute.Enumeration<['line', 'bar', 'pie', 'scatter']>;
  };
}

export interface SharedCodeBlock extends Struct.ComponentSchema {
  collectionName: 'components_shared_code_blocks';
  info: {
    displayName: 'Code block';
  };
  attributes: {
    code: Schema.Attribute.RichText;
    language: Schema.Attribute.Enumeration<['Python', 'R', 'Cpp']>;
  };
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {
    caption: Schema.Attribute.String;
    file: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    body: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    description: '';
    displayName: 'Rich text';
    icon: 'align-justify';
  };
  attributes: {
    body: Schema.Attribute.RichText;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'Seo';
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_sliders';
  info: {
    description: '';
    displayName: 'Slider';
    icon: 'address-book';
  };
  attributes: {
    files: Schema.Attribute.Media<'images', true>;
  };
}

export interface SharedTable extends Struct.ComponentSchema {
  collectionName: 'components_shared_tables';
  info: {
    displayName: 'Table';
    icon: 'database';
  };
  attributes: {
    caption: Schema.Attribute.String;
    tableData: Schema.Attribute.JSON;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.charts': SharedCharts;
      'shared.code-block': SharedCodeBlock;
      'shared.media': SharedMedia;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
      'shared.table': SharedTable;
    }
  }
}
