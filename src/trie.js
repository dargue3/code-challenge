/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
export class TrieNode {
  key;

  end;

  orders;

  parent;

  children;

  constructor(key) {
    this.key = key;
    this.end = false;
    this.parent = null;
    this.orders = [];
    this.children = {};
  }

  getOrder() {
    return this.orders;
  }
}

export class Trie {
  root = new TrieNode();

  insert(price, order) {
    let node = this.root;

    [...price.split('')].forEach(char => {
      if (!node.children[char]) {
        node.children[char] = new TrieNode(char);
        node.children[char].parent = node;
      }
      node = node.children[char];
    });

    node.end = true;
    node.orders.push(order);
  }

  find(prefix) {
    const output = [];
    let node = this.root;

    const matchedEntirePrice = [...prefix.split('')].every(char => {
      if (node.children[char]) {
        node = node.children[char];
        return true;
      }
      return false;
    });

    if (!matchedEntirePrice) return [];

    const findAllMatches = someNode => {
      if (someNode.end) {
        output.unshift(someNode.getOrder());
        return;
      }

      for (const child in someNode.children) {
        findAllMatches(someNode.children[child]);
      }
    };

    findAllMatches(node);

    return output;
  }
}
