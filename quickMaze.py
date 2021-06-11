class Node:
    def __init__(self, x, y):
        self.x  = x
        self.y = y
        self.neighbors = {}
    def addNeighbor(self, o):
        self.neighbors[(o.x, o.y)] = o

    def __str__(self):
        s = "(" + str(self.x) + ", " + str(self.y) + "): "
        for i in self.neighbors:
            s += "(" + str(self.neighbors[i].x) + ", " + str(self.neighbors[i].y) + "), "
        s = s[:-2]
        s+= "\n"
        return s
    '''def __repr__(self):
        s = "(" + str(self.x) + ", " + str(self.y) + "): "
        for i in self.neighbors:
            s += "(" + str(self.neighbors[i].x) + ", " + str(self.neighbors[i].y) + "), "
        s = s[:-2]
        s+= "\n"
        return s'''
    def __repr__(self):
        return "(" + str(self.x) + ", " + str(self.y) + "): "

    def cUp(self):
        if self.y == 0:
            return False
        return ((self.x, self.y - 1) in self.neighbors)
    def cDn(self):
        if self.y == height - 1:
            return False
        return ((self.x, self.y + 1) in self.neighbors)
    def cLf(self):
        if self.x == 0:
            return False
        return ((self.x - 1, self.y) in self.neighbors)
    def cRt(self):
        if self.x == width - 1:
            return False
        return ((self.x + 1, self.y) in self.neighbors)



class Graph:
    def __init__(self, width, height):
        self.nodes = {}
        self.width = width
        self.height = height
        self.mM = [[None] * width for i in range(height)]

    def addNode(self, n):
        self.nodes[(n.x, n.y)] = n
        #[down][right]
        self.mM[n.y][n.x] = n

    def addEdge(self, a, b):
        a.addNeighbor(b)
        b.addNeighbor(a)

    def exportTxt(self):
        f = open("newMaze.txt", "w")
        for i in self.nodes:
            f.write(str(self.nodes[i]))
        f.close()

    def __str__(self):
        s = "  "
        for i in range(width):
            s += "  " + str(i) + "  "
        s += "\n"
        for j in range(height + 1):
            s += "  +"
            for i in range(width):
                if j < height and i < width:
                    if self.mM[j][i] is not None and self.mM[j][i].cUp():
                        s += "    +"
                    else:
                        s += "----+"
                else:
                    s += "----+"
            if j != height:
                s += "\n" + str(j)
                for i in range(width):
                    if j < height and i < width:
                        if self.mM[j][i] is not None and self.mM[j][i].cLf():
                            s += "     "
                        else:
                            s += " |   "
                    else:
                        s += " |   "
                s += " |\n"


        return s

    def specialPrint(self, x, y):
        s = "  "
        for i in range(width):
            s += "  " + str(i) + "  "
        s += "\n"
        for j in range(height + 1):
            s += "  +"
            for i in range(width):
                if j < height and i < width:
                    if self.mM[j][i] is not None and self.mM[j][i].cUp():
                        s += "    +"
                    else:
                        s += "----+"
                else:
                    s += "----+"
            if j != height:
                s += "\n" + str(j)
                for i in range(width):
                    if j < height and i < width:
                        if x == i and y == j and not self.mM[j][i].cLf():
                            s += " | * "
                        elif x == i and y == j and self.mM[j][i].cLf():
                            s += "   * "
                        elif self.mM[j][i] is not None and self.mM[j][i].cLf():
                            s += "     "
                        else:
                            s += " |   "
                    else:
                        s += " |   "
                s += " |\n"


        return s

    def parseInp(self, down, right, inp):
        currNode = self.mM[down][right]
        if inp[0] == '0':
            self.addEdge(currNode, self.mM[down - 1][right])
        if inp[1] == '0':
            self.addEdge(currNode, self.mM[down][right + 1])
        if inp[2] == '0':
            self.addEdge(currNode, self.mM[down + 1][right])
        if inp[3] == '0':
            self.addEdge(currNode, self.mM[down][right - 1])


width = int(input("How many columns wide: "))
height = int(input("How many rows tall: "))
gr = Graph(width, height)


print(gr)
for i in range(width):
    for j in range(height):
        gr.addNode(Node(i, j))

def buildMaze(g):

    j = 0
    while j < height:
        i = 0
        while i < width:
            print(g.specialPrint(i, j))
            print("Currently row: ", i , "and column: ", j)
            inp = input("Edge String: TRBL: ")
            if len(inp) == 2:
                i = int(inp[0])
                j = int(inp[1])
            else:
                g.parseInp(j, i, inp)
                i += 1
        j += 1


done = "0"
while done != "-1":
    buildMaze(gr)

    done = input("Alright here's the maze, are you good to finish?")


gr.exportTxt()
