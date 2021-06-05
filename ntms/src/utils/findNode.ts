const findNode = (node: ChildNode, tagName: string): any => {
  return Array.from(node.childNodes).find((el: any) => el.rawTagName === tagName || findNode(el, tagName)) || false;
};
export default findNode;
