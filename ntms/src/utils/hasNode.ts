const hasNode = (node: ChildNode, tagName: string): boolean => {
  return Array.from(node.childNodes).some((el: any) => el.rawTagName === tagName || hasNode(el, tagName)) || false;
};
export default hasNode;
