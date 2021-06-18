function Node(prio, val) {
  this.prio = prio;
  this.val = val;
}

function BinaryHeap() {
  this.vals = [];

  this.insert = function(prio, val) {
    var newNode = new Node(prio, val);
    this.vals.push(newNode);
    var ind = this.vals.length - 1;
    var curr = this.vals[ind];

    while (ind > 0) {
      var parInd = this.getParentInd(ind);
      var parent = this.vals[parInd];
      if (parent.prio > curr.prio) {
        this.vals[parInd] = curr;
        this.vals[ind] = parent;
        ind = parInd;
      } else {
        break;
      }
    }
  }

  this.contains = function(val) {
    for(node of this.vals) {
      if (node.val == val) {
        return true;
      }
    }
    return false;
  }

  this.update = function(prio, val) {
    var ind = 0;
    for (var i = 0; i < this.vals.length; i++) {
      if(this.vals[i].val == val) {
        ind = i;
        break;
      }
    }
    this.vals[i].prio = prio;
    var curr = this.vals[ind];
    while(ind > 0) {
      var parInd = this.getParentInd(ind);
      var parent = this.vals[parInd];
      if (parent.prio > curr.prio) {
        this.vals[parInd] = curr;
        this.vals[ind] = parent;
        ind = parInd;
      } else {
        break;
      }
    }
  }

  this.remove = function() {
    let min = this.vals[0];
    if(this.vals.length == 1) {
      return this.vals.pop().val;
    }
    this.vals[0] = this.vals.pop();
    var ind = 0;
    var length = this.vals.length;
    var curr = this.vals[0];
    while (true) {
      var leftChildInd = 2 * ind + 1;
      var rightChildInd = 2 * ind + 2;
      var leftChild, rightChild;
      var swap = null;

      if (leftChildInd < length) {
        leftChild = this.vals[leftChildInd];
        if (leftChild.prio < curr.prio) {
          swap = leftChildInd;
        }
      }
      if (rightChildInd < length) {
        rightChild = this.vals[rightChildInd];
        if (
          (swap === null && rightChild.prio < curr.prio) ||
          (swap !== null && rightChild.prio < leftChild.prio)
        )
          swap = rightChildInd;
      }

      if (swap === null) break;
      this.vals[ind] = this.vals[swap];
      this.vals[swap] = curr;
      ind = swap;
    }
    return min.val;
  }

  this.getParentInd = function(ind) {
    return Math.floor((ind - 1) / 2);
  }

  this.prettyPrint = function() {
    var s = "[";
    for (val of this.vals) {
      s += "(" + val.prio + ", " + val.val.prettyString() + ")" + ", ";
    }
    s+= "]";
    console.log(s);
  }

  this.isEmpty = function() {
    return this.vals.length == 0;
  }
}
