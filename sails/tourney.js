(function (_, Kotlin) {
  'use strict';
  var println = Kotlin.kotlin.io.println_s8jyv4$;
  var Exception = Kotlin.kotlin.Exception;
  var IllegalStateException = Kotlin.kotlin.IllegalStateException;
  var toList = Kotlin.kotlin.collections.toList_7wnvza$;
  var toMutableList = Kotlin.kotlin.collections.toMutableList_4c7yge$;
  Tree$Node.prototype = Object.create(Tree.prototype);
  Tree$Node.prototype.constructor = Tree$Node;
  Tree$Leaf.prototype = Object.create(Tree.prototype);
  Tree$Leaf.prototype.constructor = Tree$Leaf;
  Tree$Empty.prototype = Object.create(Tree.prototype);
  Tree$Empty.prototype.constructor = Tree$Empty;
  Partida$Finished.prototype = Object.create(Partida.prototype);
  Partida$Finished.prototype.constructor = Partida$Finished;
  Partida$Scheduled.prototype = Object.create(Partida.prototype);
  Partida$Scheduled.prototype.constructor = Partida$Scheduled;
  Partida$Empty.prototype = Object.create(Partida.prototype);
  Partida$Empty.prototype.constructor = Partida$Empty;
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
  Tree.prototype.toString = function () {
    return Kotlin.toString(this.value);
  };
  function Tree$Node(index, value, left, right) {
    Tree.call(this);
    this.index_z6w9bi$_0 = index;
    this.value_z6w9bi$_0 = value;
    this.left = left;
    this.right = right;
  }
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
    return this.index;
  };
  Tree$Node.prototype.component2 = function () {
    return this.value;
  };
  Tree$Node.prototype.component3 = function () {
    return this.left;
  };
  Tree$Node.prototype.component4 = function () {
    return this.right;
  };
  Tree$Node.prototype.copy_292aaw$ = function (index, value, left, right) {
    return new Tree$Node(index === void 0 ? this.index : index, value === void 0 ? this.value : value, left === void 0 ? this.left : left, right === void 0 ? this.right : right);
  };
  Tree$Node.prototype.toString = function () {
    return 'Node(index=' + Kotlin.toString(this.index) + (', value=' + Kotlin.toString(this.value)) + (', left=' + Kotlin.toString(this.left)) + (', right=' + Kotlin.toString(this.right)) + ')';
  };
  Tree$Node.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.index) | 0;
    result = result * 31 + Kotlin.hashCode(this.value) | 0;
    result = result * 31 + Kotlin.hashCode(this.left) | 0;
    result = result * 31 + Kotlin.hashCode(this.right) | 0;
    return result;
  };
  Tree$Node.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.index, other.index) && Kotlin.equals(this.value, other.value) && Kotlin.equals(this.left, other.left) && Kotlin.equals(this.right, other.right)))));
  };
  function Tree$Leaf(index, value) {
    Tree.call(this);
    this.index_z5m82a$_0 = index;
    this.value_z5m82a$_0 = value;
  }
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
    return this.index;
  };
  Tree$Leaf.prototype.component2 = function () {
    return this.value;
  };
  Tree$Leaf.prototype.copy_q85jvs$ = function (index, value) {
    return new Tree$Leaf(index === void 0 ? this.index : index, value === void 0 ? this.value : value);
  };
  Tree$Leaf.prototype.toString = function () {
    return 'Leaf(index=' + Kotlin.toString(this.index) + (', value=' + Kotlin.toString(this.value)) + ')';
  };
  Tree$Leaf.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.index) | 0;
    result = result * 31 + Kotlin.hashCode(this.value) | 0;
    return result;
  };
  Tree$Leaf.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.index, other.index) && Kotlin.equals(this.value, other.value)))));
  };
  function Tree$Empty() {
    Tree$Empty_instance = this;
    Tree.call(this);
    throw new IllegalStateException();
  }
  Object.defineProperty(Tree$Empty.prototype, 'value', {
    get: function () {
      return this.value_l6t11z$_0;
    }
  });
  Object.defineProperty(Tree$Empty.prototype, 'index', {
    get: function () {
      return this.index_l6t11z$_0;
    },
    set: function (index) {
      this.index_l6t11z$_0 = index;
    }
  });
  Tree$Empty.prototype.toString = function () {
    return 'Tree:Empty';
  };
  Tree$Empty.$metadata$ = {
    kind: Kotlin.Kind.OBJECT,
    simpleName: 'Empty',
    interfaces: [Tree]
  };
  var Tree$Empty_instance = null;
  function Tree$Empty_getInstance() {
    if (Tree$Empty_instance === null) {
      new Tree$Empty();
    }
    return Tree$Empty_instance;
  }
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
  Partida$Finished.prototype.toString = function () {
    return 'Finished(equipe1=' + Kotlin.toString(this.equipe1) + (', equipe2=' + Kotlin.toString(this.equipe2)) + (', resultado=' + Kotlin.toString(this.resultado)) + ')';
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
    this.equipe1_4i0bbi$_0 = null;
    this.equipe2_4i0bbi$_0 = null;
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
    return 'Partida.Empty';
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
  Bracket.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'Bracket',
    interfaces: []
  };
  Bracket.prototype.component1 = function () {
    return this.root;
  };
  Bracket.prototype.copy_cwzbj8$ = function (root) {
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
      tmp$ = new Tree$Leaf(null, new Partida$Scheduled(times.get_za3lpa$(0), times.get_za3lpa$(1)));
    else {
      var teamsList = toMutableList(times);
      while (teamsList.size % 4 !== 0)
        teamsList.add_11rb$(new Equipe('W.O', 'WO-' + Kotlin.toString(Math.random())));
      var levels = Math.log(teamsList.size / 2) / Math.log(2.0) | 0;
      tmp$ = buildTree(toList(teamsList).iterator(), 0, levels);
    }
    var root = tmp$;
    return assignIndex(new Bracket(root));
  }
  function assignIndex(bracket) {
    var index = 0;
    var queue = Kotlin.kotlin.collections.ArrayList_init_ww73n8$();
    var visited = Kotlin.kotlin.collections.LinkedHashSet_init_287e2$();
    queue.add_11rb$(bracket.root);
    visited.add_11rb$(bracket.root);
    while (!queue.isEmpty()) {
      var current = queue.removeAt_za3lpa$(0);
      current.index = index;
      index = index + 1 | 0;
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
    println(bracket.root);
    return bracket;
  }
  function findMatch(bracket, index) {
    return findMatch_0(bracket.root, index);
  }
  function findMatch_0(node, index) {
    var tmp$;
    var tmp$_0;
    if ((tmp$ = node.index) != null) {
      var tmp$_1;
      if (tmp$ === index)
        return node;
      if (Kotlin.isType(node, Tree$Node)) {
        var left = findMatch_0(node.left, index);
        var right = findMatch_0(node.right, index);
        tmp$_1 = left != null ? left : right;
      }
       else
        tmp$_1 = null;
      return tmp$_1;
    }
     else
      tmp$_0 = null;
    return tmp$_0;
  }
  function buildTree(iterator, index, maxTreeHeight) {
    var tmp$;
    println('Index: ' + index + ' Level: ' + maxTreeHeight);
    if (index > maxTreeHeight)
      tmp$ = Tree$Empty_getInstance();
    else if (index === maxTreeHeight)
      tmp$ = new Tree$Leaf(null, new Partida$Scheduled(iterator.next(), iterator.next()));
    else
      return new Tree$Node(null, Partida$Empty_getInstance(), buildTree(iterator, index + 1 | 0, maxTreeHeight), buildTree(iterator, index + 1 | 0, maxTreeHeight));
    return tmp$;
  }
  _.main_kand9s$ = main;
  Tree.Node = Tree$Node;
  Tree.Leaf = Tree$Leaf;
  Object.defineProperty(Tree, 'Empty', {
    get: Tree$Empty_getInstance
  });
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
  package$bracket.createBracket = createBracket;
  package$bracket.assignIndex = assignIndex;
  package$bracket.findMatch = findMatch;
  main([]);
  Kotlin.defineModule('tourney', _);
  return _;
}(module.exports, require('kotlin')));
