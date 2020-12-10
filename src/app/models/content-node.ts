import { AttributeNode } from './attribute-node';


export class ContentNode
{
  constructor(
    public type: string = '',
    public tag: string = '',
    public content: string | null = '',
    public classes: string | null = '',
    public attributes: AttributeNode[] | null = null,
    public children: ContentNode[] | null = null
  ) {
    this.type = type;
    this.tag = tag;
    this.content = content;
    this.classes = classes;
    this.attributes = attributes;
    this.children = children;
  }

}
