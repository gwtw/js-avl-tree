/**
 * @license
 * Copyright Daniel Imms <http://www.growingwiththeweb.com>
 * Released under MIT license. See LICENSE in the project root for details.
 */

/**
 * Creates a new AVL Tree node.
 *
 * @private
 * @param {Object} key The key of the new node.
 * @param {Object} value The value of the new node.
 */
var Node = class {
	constructor(key, value){
		this.left = null;
		this.right = null;
		this.height = null;
		this.key = key;
		this.value = value;
	}
	/**
	* Performs a left rotate on this node.
	*
	*     a                              b
	*    / \                            / \
	*   c   b   -> a.rotateLeft() ->   a   e
	*      / \                        / \
	*     d   e                      c   d
	*
	* @return {Node} The root of the sub-tree; the node where this node used to be.
	*/
	rotateRight(){
		var other = this.left;
		this.left = other.right;
		other.right = this;
		this.height = Math.max(this.leftHeight(), this.rightHeight()) + 1;
		other.height = Math.max(other.leftHeight(), this.height) + 1;
		return other;
	}
	/**
	* Performs a left rotate on this node.
	*
	*     a                              b
	*    / \                            / \
	*   c   b   -> a.rotateLeft() ->   a   e
	*      / \                        / \
	*     d   e                      c   d
	*
	* @return {Node} The root of the sub-tree; the node where this node used to be.
	*/
	rotateLeft(){
		var other = this.right;
		this.right = other.left;
		other.left = this;
		this.height = Math.max(this.leftHeight(), this.rightHeight()) + 1;
		other.height = Math.max(other.rightHeight(), this.height) + 1;
		return other;
	}
	/**
	* Convenience function to get the height of the left child of the node,
	* returning -1 if the node is null.
	*
	* @return {number} The height of the left child, or -1 if it doesn't exist.
	*/
	leftHeight(){
		if (!this.left) {
			return -1;
		}
		return this.left.height;
	}

	/**
	* Convenience function to get the height of the right child of the node,
	* returning -1 if the node is null.
	*
	* @return {number} The height of the right child, or -1 if it doesn't exist.
	*/
	rightHeight(){
		if (!this.right) {
			return -1;
		}
		return this.right.height;
	}
}
module.exports = Node;
