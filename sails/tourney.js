(function (_, Kotlin) {
  'use strict';
  var println = Kotlin.kotlin.io.println_s8jyv4$;
  var Exception = Kotlin.kotlin.Exception;
  var Iterator = Kotlin.kotlin.collections.Iterator;
  var Iterable = Kotlin.kotlin.collections.Iterable;
  var toList = Kotlin.kotlin.collections.toList_7wnvza$;
  var toMutableList = Kotlin.kotlin.collections.toMutableList_4c7yge$;
  var IllegalStateException = Kotlin.kotlin.IllegalStateException;
  var Enum = Kotlin.kotlin.Enum;
  Tree$Node.prototype = Object.create(Tree.prototype);
  Tree$Node.prototype.constructor = Tree$Node;
  Tree$Leaf.prototype = Object.create(Tree.prototype);
  Tree$Leaf.prototype.constructor = Tree$Leaf;
  Partida$Finished.prototype = Object.create(Partida.prototype);
  Partida$Finished.prototype.constructor = Partida$Finished;
  Partida$Scheduled.prototype = Object.create(Partida.prototype);
  Partida$Scheduled.prototype.constructor = Partida$Scheduled;
  Partida$Empty.prototype = Object.create(Partida.prototype);
  Partida$Empty.prototype.constructor = Partida$Empty;
  NodePos.prototype = Object.create(Enum.prototype);
  NodePos.prototype.constructor = NodePos;
  function main$lambda(it) {
  }
  function main(args) {
    process.chdir(__dirname);
    var dirName = __dirname;
    println(dirName);
    var sails;
    try {
      sails = require('sails');
    }
     catch (e) {
      if (Kotlin.isType(e, Exception)) {
        return;
      }
       else
        throw e;
    }
    var rc = main$lambda;
    try {
      rc = require('rc');
    }
     catch (e) {
      if (Kotlin.isType(e, Exception)) {
        try {
          rc = require('sails/node_modules/rc');
        }
         catch (e1) {
          if (!Kotlin.isType(e1, Exception))
            throw e1;
        }
      }
       else
        throw e;
    }
    sails.lift(rc('sails'));
  }
  function Tree() {
  }
  function Tree$Node(parent, index, value) {
    Tree.call(this);
    this.parent_z6w9bi$_0 = parent;
    this.index_z6w9bi$_0 = index;
    this.value_z6w9bi$_0 = value;
    this.left = this.left;
    this.right = this.right;
  }
  Object.defineProperty(Tree$Node.prototype, 'parent', {
    get: function () {
      return this.parent_z6w9bi$_0;
    }
  });
  Object.defineProperty(Tree$Node.prototype, 'index', {
    get: function () {
      return this.index_z6w9bi$_0;
    },
    set: function (index) {
      this.index_z6w9bi$_0 = index;
    }
  });
  Object.defineProperty(Tree$Node.prototype, 'value', {
    get: function () {
      return this.value_z6w9bi$_0;
    }
  });
  Tree$Node.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'Node',
    interfaces: [Tree]
  };
  Tree$Node.prototype.component1 = function () {
    return this.parent;
  };
  Tree$Node.prototype.component2 = function () {
    return this.index;
  };
  Tree$Node.prototype.component3 = function () {
    return this.value;
  };
  Tree$Node.prototype.copy_uvwis1$ = function (parent, index, value) {
    return new Tree$Node(parent === void 0 ? this.parent : parent, index === void 0 ? this.index : index, value === void 0 ? this.value : value);
  };
  Tree$Node.prototype.toString = function () {
    return 'Node(parent=' + Kotlin.toString(this.parent) + (', index=' + Kotlin.toString(this.index)) + (', value=' + Kotlin.toString(this.value)) + ')';
  };
  Tree$Node.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.parent) | 0;
    result = result * 31 + Kotlin.hashCode(this.index) | 0;
    result = result * 31 + Kotlin.hashCode(this.value) | 0;
    return result;
  };
  Tree$Node.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.parent, other.parent) && Kotlin.equals(this.index, other.index) && Kotlin.equals(this.value, other.value)))));
  };
  function Tree$Leaf(parent, index, value) {
    Tree.call(this);
    this.parent_z5m82a$_0 = parent;
    this.index_z5m82a$_0 = index;
    this.value_z5m82a$_0 = value;
  }
  Object.defineProperty(Tree$Leaf.prototype, 'parent', {
    get: function () {
      return this.parent_z5m82a$_0;
    }
  });
  Object.defineProperty(Tree$Leaf.prototype, 'index', {
    get: function () {
      return this.index_z5m82a$_0;
    },
    set: function (index) {
      this.index_z5m82a$_0 = index;
    }
  });
  Object.defineProperty(Tree$Leaf.prototype, 'value', {
    get: function () {
      return this.value_z5m82a$_0;
    }
  });
  Tree$Leaf.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'Leaf',
    interfaces: [Tree]
  };
  Tree$Leaf.prototype.component1 = function () {
    return this.parent;
  };
  Tree$Leaf.prototype.component2 = function () {
    return this.index;
  };
  Tree$Leaf.prototype.component3 = function () {
    return this.value;
  };
  Tree$Leaf.prototype.copy_uvwis1$ = function (parent, index, value) {
    return new Tree$Leaf(parent === void 0 ? this.parent : parent, index === void 0 ? this.index : index, value === void 0 ? this.value : value);
  };
  Tree$Leaf.prototype.toString = function () {
    return 'Leaf(parent=' + Kotlin.toString(this.parent) + (', index=' + Kotlin.toString(this.index)) + (', value=' + Kotlin.toString(this.value)) + ')';
  };
  Tree$Leaf.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.parent) | 0;
    result = result * 31 + Kotlin.hashCode(this.index) | 0;
    result = result * 31 + Kotlin.hashCode(this.value) | 0;
    return result;
  };
  Tree$Leaf.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.parent, other.parent) && Kotlin.equals(this.index, other.index) && Kotlin.equals(this.value, other.value)))));
  };
  Tree.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'Tree',
    interfaces: []
  };
  function Partida() {
  }
  function Partida$Finished(equipe1, equipe2, resultado) {
    Partida.call(this);
    this.equipe1_6cfujd$_0 = equipe1;
    this.equipe2_6cfujd$_0 = equipe2;
    this.resultado = resultado;
    this.winnner = this.resultado.time1Pontos > this.resultado.time2Pontos ? this.equipe1 : this.equipe2;
  }
  Object.defineProperty(Partida$Finished.prototype, 'equipe1', {
    get: function () {
      return this.equipe1_6cfujd$_0;
    }
  });
  Object.defineProperty(Partida$Finished.prototype, 'equipe2', {
    get: function () {
      return this.equipe2_6cfujd$_0;
    }
  });
  Partida$Finished.prototype.toString = function () {
    return 'Finished(equipe1=' + this.equipe1 + ', equipe2=' + this.equipe2 + ', resultado=' + this.resultado + ', winnner=' + this.winnner + ')';
  };
  Partida$Finished.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'Finished',
    interfaces: [Partida]
  };
  Partida$Finished.prototype.component1 = function () {
    return this.equipe1;
  };
  Partida$Finished.prototype.component2 = function () {
    return this.equipe2;
  };
  Partida$Finished.prototype.component3 = function () {
    return this.resultado;
  };
  Partida$Finished.prototype.copy_bf2end$ = function (equipe1, equipe2, resultado) {
    return new Partida$Finished(equipe1 === void 0 ? this.equipe1 : equipe1, equipe2 === void 0 ? this.equipe2 : equipe2, resultado === void 0 ? this.resultado : resultado);
  };
  Partida$Finished.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.equipe1) | 0;
    result = result * 31 + Kotlin.hashCode(this.equipe2) | 0;
    result = result * 31 + Kotlin.hashCode(this.resultado) | 0;
    return result;
  };
  Partida$Finished.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.equipe1, other.equipe1) && Kotlin.equals(this.equipe2, other.equipe2) && Kotlin.equals(this.resultado, other.resultado)))));
  };
  function Partida$Scheduled(equipe1, equipe2) {
    Partida.call(this);
    this.equipe1_e18z2q$_0 = equipe1;
    this.equipe2_e18z2q$_0 = equipe2;
  }
  Object.defineProperty(Partida$Scheduled.prototype, 'equipe1', {
    get: function () {
      return this.equipe1_e18z2q$_0;
    }
  });
  Object.defineProperty(Partida$Scheduled.prototype, 'equipe2', {
    get: function () {
      return this.equipe2_e18z2q$_0;
    }
  });
  Partida$Scheduled.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'Scheduled',
    interfaces: [Partida]
  };
  Partida$Scheduled.prototype.component1 = function () {
    return this.equipe1;
  };
  Partida$Scheduled.prototype.component2 = function () {
    return this.equipe2;
  };
  Partida$Scheduled.prototype.copy_g3rd4k$ = function (equipe1, equipe2) {
    return new Partida$Scheduled(equipe1 === void 0 ? this.equipe1 : equipe1, equipe2 === void 0 ? this.equipe2 : equipe2);
  };
  Partida$Scheduled.prototype.toString = function () {
    return 'Scheduled(equipe1=' + Kotlin.toString(this.equipe1) + (', equipe2=' + Kotlin.toString(this.equipe2)) + ')';
  };
  Partida$Scheduled.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.equipe1) | 0;
    result = result * 31 + Kotlin.hashCode(this.equipe2) | 0;
    return result;
  };
  Partida$Scheduled.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.equipe1, other.equipe1) && Kotlin.equals(this.equipe2, other.equipe2)))));
  };
  function Partida$Empty() {
    Partida$Empty_instance = this;
    Partida.call(this);
    this.TBD = new Equipe('TBD', 'TIME-TBD');
    this.equipe1_4i0bbi$_0 = this.TBD;
    this.equipe2_4i0bbi$_0 = this.TBD;
  }
  Object.defineProperty(Partida$Empty.prototype, 'equipe1', {
    get: function () {
      return this.equipe1_4i0bbi$_0;
    }
  });
  Object.defineProperty(Partida$Empty.prototype, 'equipe2', {
    get: function () {
      return this.equipe2_4i0bbi$_0;
    }
  });
  Partida$Empty.prototype.toString = function () {
    return 'Partida:Empty';
  };
  Partida$Empty.$metadata$ = {
    kind: Kotlin.Kind.OBJECT,
    simpleName: 'Empty',
    interfaces: [Partida]
  };
  var Partida$Empty_instance = null;
  function Partida$Empty_getInstance() {
    if (Partida$Empty_instance === null) {
      new Partida$Empty();
    }
    return Partida$Empty_instance;
  }
  Partida.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'Partida',
    interfaces: []
  };
  function Resultado(time1Pontos, time2Pontos) {
    this.time1Pontos = time1Pontos;
    this.time2Pontos = time2Pontos;
  }
  Resultado.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'Resultado',
    interfaces: []
  };
  Resultado.prototype.component1 = function () {
    return this.time1Pontos;
  };
  Resultado.prototype.component2 = function () {
    return this.time2Pontos;
  };
  Resultado.prototype.copy_vux9f0$ = function (time1Pontos, time2Pontos) {
    return new Resultado(time1Pontos === void 0 ? this.time1Pontos : time1Pontos, time2Pontos === void 0 ? this.time2Pontos : time2Pontos);
  };
  Resultado.prototype.toString = function () {
    return 'Resultado(time1Pontos=' + Kotlin.toString(this.time1Pontos) + (', time2Pontos=' + Kotlin.toString(this.time2Pontos)) + ')';
  };
  Resultado.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.time1Pontos) | 0;
    result = result * 31 + Kotlin.hashCode(this.time2Pontos) | 0;
    return result;
  };
  Resultado.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.time1Pontos, other.time1Pontos) && Kotlin.equals(this.time2Pontos, other.time2Pontos)))));
  };
  function Equipe(nome, codigo) {
    this.nome = nome;
    this.codigo = codigo;
  }
  Equipe.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'Equipe',
    interfaces: []
  };
  Equipe.prototype.component1 = function () {
    return this.nome;
  };
  Equipe.prototype.component2 = function () {
    return this.codigo;
  };
  Equipe.prototype.copy_puj7f4$ = function (nome, codigo) {
    return new Equipe(nome === void 0 ? this.nome : nome, codigo === void 0 ? this.codigo : codigo);
  };
  Equipe.prototype.toString = function () {
    return 'Equipe(nome=' + Kotlin.toString(this.nome) + (', codigo=' + Kotlin.toString(this.codigo)) + ')';
  };
  Equipe.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.nome) | 0;
    result = result * 31 + Kotlin.hashCode(this.codigo) | 0;
    return result;
  };
  Equipe.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.nome, other.nome) && Kotlin.equals(this.codigo, other.codigo)))));
  };
  function Bracket(root) {
    this.root = root;
  }
  function Bracket$iterator$ObjectLiteral(this$Bracket) {
    this.iterator = bfs(this$Bracket.root).iterator();
  }
  Bracket$iterator$ObjectLiteral.prototype.hasNext = function () {
    return this.iterator.hasNext();
  };
  Bracket$iterator$ObjectLiteral.prototype.next = function () {
    return this.iterator.next();
  };
  Bracket$iterator$ObjectLiteral.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    interfaces: [Iterator]
  };
  Bracket.prototype.iterator = function () {
    return new Bracket$iterator$ObjectLiteral(this);
  };
  Bracket.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'Bracket',
    interfaces: [Iterable]
  };
  Bracket.prototype.component1 = function () {
    return this.root;
  };
  Bracket.prototype.copy_s4tmvr$ = function (root) {
    return new Bracket(root === void 0 ? this.root : root);
  };
  Bracket.prototype.toString = function () {
    return 'Bracket(root=' + Kotlin.toString(this.root) + ')';
  };
  Bracket.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.root) | 0;
    return result;
  };
  Bracket.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && Kotlin.equals(this.root, other.root))));
  };
  function bfs(root) {
    var queue = Kotlin.kotlin.collections.ArrayList_init_ww73n8$();
    var visited = Kotlin.kotlin.collections.LinkedHashSet_init_287e2$();
    var list = Kotlin.kotlin.collections.ArrayList_init_ww73n8$();
    queue.add_11rb$(root);
    visited.add_11rb$(root);
    while (!queue.isEmpty()) {
      var current = queue.removeAt_za3lpa$(0);
      list.add_11rb$(current);
      if (Kotlin.isType(current, Tree$Node)) {
        if (!visited.contains_11rb$(current.left)) {
          queue.add_11rb$(current.left);
          visited.add_11rb$(current.left);
        }
        if (!visited.contains_11rb$(current.right)) {
          queue.add_11rb$(current.right);
          visited.add_11rb$(current.right);
        }
      }
    }
    return toList(list);
  }
  function createBracket(timesArray) {
    var tmp$;
    if (!(timesArray.length >= 2)) {
      var message = 'Failed requirement.';
      throw new Kotlin.kotlin.IllegalArgumentException(message.toString());
    }
    var destination = Kotlin.kotlin.collections.ArrayList_init_ww73n8$(timesArray.length);
    var tmp$_0;
    for (tmp$_0 = 0; tmp$_0 !== timesArray.length; ++tmp$_0) {
      var item = timesArray[tmp$_0];
      destination.add_11rb$(new Equipe(item.nome, item.codigo));
    }
    var times = toList(destination);
    if (times.size === 2)
      tmp$ = new Tree$Leaf(null, 0, new Partida$Scheduled(times.get_za3lpa$(0), times.get_za3lpa$(1)));
    else {
      var teamsList = toMutableList(times);
      while (teamsList.size % 4 !== 0)
        teamsList.add_11rb$(new Equipe('W.O', 'WO-' + Kotlin.toString(Math.random())));
      var levels = Math.log(teamsList.size / 2) / Math.log(2.0) | 0;
      var stack = Kotlin.kotlin.collections.ArrayList_init_ww73n8$();
      tmp$ = buildTree(toList(teamsList).iterator(), 0, levels, NodePos$ROOT_getInstance(), stack);
    }
    var root = tmp$;
    return new Bracket(root);
  }
  function addResultado(bracket, index, time1Pontos, time2Pontos) {
    var partidaNode = findMatch(bracket, index);
    if (partidaNode != null) {
      var tmp$, tmp$_0, tmp$_1, tmp$_2, tmp$_3;
      if (!Kotlin.isType(partidaNode.value, Partida$Scheduled)) {
        var message = 'Failed requirement.';
        throw new Kotlin.kotlin.IllegalArgumentException(message.toString());
      }
      var partida = Kotlin.isType(tmp$ = partidaNode.value, Partida$Scheduled) ? tmp$ : Kotlin.throwCCE();
      var finished = new Partida$Finished(partida.equipe1, partida.equipe2, new Resultado(time1Pontos, time2Pontos));
      if (Kotlin.isType(partidaNode, Tree$Node)) {
        var $receiver = partidaNode.copy_uvwis1$(void 0, void 0, finished);
        $receiver.left = partidaNode.left;
        $receiver.right = partidaNode.right;
        tmp$_0 = $receiver;
      }
       else if (Kotlin.isType(partidaNode, Tree$Leaf))
        tmp$_0 = partidaNode.copy_uvwis1$(void 0, void 0, finished);
      else
        tmp$_0 = Kotlin.noWhenBranchMatched();
      var newNode = tmp$_0;
      if (newNode.parent != null) {
        var parent = Kotlin.isType(tmp$_1 = newNode.parent, Tree$Node) ? tmp$_1 : Kotlin.throwCCE();
        if (parent.left.index === newNode.index)
          parent.left = newNode;
        else if (parent.right.index === newNode.index)
          parent.right = newNode;
        else
          throw new IllegalStateException();
        if (Kotlin.isType(parent.value, Partida$Empty)) {
          var oldParent = parent;
          if (Kotlin.isType(oldParent.left.value, Partida$Finished) && Kotlin.isType(oldParent.right.value, Partida$Finished)) {
            var newPartida = new Partida$Scheduled((Kotlin.isType(tmp$_2 = oldParent.left.value, Partida$Finished) ? tmp$_2 : Kotlin.throwCCE()).winnner, (Kotlin.isType(tmp$_3 = oldParent.right.value, Partida$Finished) ? tmp$_3 : Kotlin.throwCCE()).winnner);
            var $receiver_0 = oldParent.copy_uvwis1$(void 0, void 0, newPartida);
            $receiver_0.left = oldParent.left;
            $receiver_0.right = oldParent.right;
            var newParent = $receiver_0;
            if (newParent.parent != null) {
              var topNode = newParent.parent;
              if (topNode.left.index === newParent.index)
                topNode.left = newParent;
              else if (topNode.right.index === newParent.index)
                topNode.right = newParent;
              else
                throw new IllegalStateException();
            }
             else {
              bracket.root = newParent;
            }
          }
        }
      }
       else {
        bracket.root = newNode;
      }
    }
    return bracket;
  }
  function printTree$lambda(it) {
    println('Index: ' + Kotlin.toString(it.index) + ' Partida: ' + Kotlin.toString(it.value));
  }
  function printTree(bracket) {
    var action = printTree$lambda;
    var tmp$;
    tmp$ = bracket.iterator();
    while (tmp$.hasNext()) {
      var element = tmp$.next();
      action(element);
    }
  }
  function findMatch(bracket, index) {
    return findMatch_0(bracket.root, index);
  }
  function findMatch_0(node, index) {
    var tmp$;
    if (node.index === index)
      return node;
    if (Kotlin.isType(node, Tree$Node)) {
      var left = findMatch_0(node.left, index);
      var right = findMatch_0(node.right, index);
      tmp$ = left != null ? left : right;
    }
     else
      tmp$ = null;
    return tmp$;
  }
  function NodePos(name, ordinal, calc) {
    Enum.call(this);
    this.calc = calc;
    this.name$ = name;
    this.ordinal$ = ordinal;
  }
  function NodePos_initFields() {
    NodePos_initFields = function () {
    };
    NodePos$LEFT_instance = new NodePos('LEFT', 0, NodePos$NodePos$LEFT_init$lambda);
    NodePos$RIGHT_instance = new NodePos('RIGHT', 1, NodePos$NodePos$RIGHT_init$lambda);
    NodePos$ROOT_instance = new NodePos('ROOT', 2, NodePos$NodePos$ROOT_init$lambda);
  }
  function NodePos$NodePos$LEFT_init$lambda(it) {
    return (2 * it | 0) + 1 | 0;
  }
  var NodePos$LEFT_instance;
  function NodePos$LEFT_getInstance() {
    NodePos_initFields();
    return NodePos$LEFT_instance;
  }
  function NodePos$NodePos$RIGHT_init$lambda(it) {
    return (2 * it | 0) + 2 | 0;
  }
  var NodePos$RIGHT_instance;
  function NodePos$RIGHT_getInstance() {
    NodePos_initFields();
    return NodePos$RIGHT_instance;
  }
  function NodePos$NodePos$ROOT_init$lambda(it) {
    return 0;
  }
  var NodePos$ROOT_instance;
  function NodePos$ROOT_getInstance() {
    NodePos_initFields();
    return NodePos$ROOT_instance;
  }
  NodePos.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'NodePos',
    interfaces: [Enum]
  };
  function NodePos$values() {
    return [NodePos$LEFT_getInstance(), NodePos$RIGHT_getInstance(), NodePos$ROOT_getInstance()];
  }
  NodePos.values = NodePos$values;
  function NodePos$valueOf(name) {
    switch (name) {
      case 'LEFT':
        return NodePos$LEFT_getInstance();
      case 'RIGHT':
        return NodePos$RIGHT_getInstance();
      case 'ROOT':
        return NodePos$ROOT_getInstance();
      default:Kotlin.throwISE('No enum constant bracket.NodePos.' + name);
    }
  }
  NodePos.valueOf_61zpoe$ = NodePos$valueOf;
  function buildTree(iterator, index, maxTreeHeight, pos, stack) {
    var tmp$, tmp$_0;
    if (index > maxTreeHeight)
      throw new IllegalStateException();
    else if (index === maxTreeHeight) {
      var parentNode = stack.isEmpty() ? null : stack.get_za3lpa$(0);
      return new Tree$Leaf(parentNode, pos.calc((tmp$ = parentNode != null ? parentNode.index : null) != null ? tmp$ : 0), new Partida$Scheduled(iterator.next(), iterator.next()));
    }
     else {
      var parentNode_0 = stack.isEmpty() ? null : stack.get_za3lpa$(0);
      var node = new Tree$Node(parentNode_0, pos.calc((tmp$_0 = parentNode_0 != null ? parentNode_0.index : null) != null ? tmp$_0 : 0), Partida$Empty_getInstance());
      stack.add_wxm5ur$(0, node);
      node.left = buildTree(iterator, index + 1 | 0, maxTreeHeight, NodePos$LEFT_getInstance(), stack);
      node.right = buildTree(iterator, index + 1 | 0, maxTreeHeight, NodePos$RIGHT_getInstance(), stack);
      stack.removeAt_za3lpa$(0);
      return node;
    }
  }
  _.main_kand9s$ = main;
  Tree.Node = Tree$Node;
  Tree.Leaf = Tree$Leaf;
  var package$bracket = _.bracket || (_.bracket = {});
  package$bracket.Tree = Tree;
  Partida.Finished = Partida$Finished;
  Partida.Scheduled = Partida$Scheduled;
  Object.defineProperty(Partida, 'Empty', {
    get: Partida$Empty_getInstance
  });
  package$bracket.Partida = Partida;
  package$bracket.Resultado = Resultado;
  package$bracket.Equipe = Equipe;
  package$bracket.Bracket = Bracket;
  package$bracket.bfs_k6352y$ = bfs;
  package$bracket.createBracket = createBracket;
  package$bracket.addResultado = addResultado;
  package$bracket.printTree = printTree;
  package$bracket.findMatch = findMatch;
  Object.defineProperty(NodePos, 'LEFT', {
    get: NodePos$LEFT_getInstance
  });
  Object.defineProperty(NodePos, 'RIGHT', {
    get: NodePos$RIGHT_getInstance
  });
  Object.defineProperty(NodePos, 'ROOT', {
    get: NodePos$ROOT_getInstance
  });
  package$bracket.NodePos = NodePos;
  main([]);
  Kotlin.defineModule('tourney', _);
  return _;
}(module.exports, require('kotlin')));
