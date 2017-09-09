(function (_, Kotlin) {
  'use strict';
  var println = Kotlin.kotlin.io.println_s8jyv4$;
  var Exception = Kotlin.kotlin.Exception;
  var reversed = Kotlin.kotlin.collections.reversed_7wnvza$;
  var until = Kotlin.kotlin.ranges.until_dqglrj$;
  var toList = Kotlin.kotlin.collections.toList_7wnvza$;
  var Enum = Kotlin.kotlin.Enum;
  var toMutableList = Kotlin.kotlin.collections.toMutableList_4c7yge$;
  var downTo = Kotlin.kotlin.ranges.downTo_dqglrj$;
  var toList_0 = Kotlin.kotlin.collections.toList_us0mfu$;
  var IllegalStateException = Kotlin.kotlin.IllegalStateException;
  var Iterable = Kotlin.kotlin.collections.Iterable;
  NodePos.prototype = Object.create(Enum.prototype);
  NodePos.prototype.constructor = NodePos;
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
  function prettyPrint(bracket) {
    var tmp$, tmp$_0, tmp$_1, tmp$_2, tmp$_3, tmp$_4, tmp$_5, tmp$_6, tmp$_7;
    var finalList = Kotlin.kotlin.collections.ArrayList_init_ww73n8$();
    var list = bfs(bracket.root);
    var reversed_0 = reversed(list);
    var numberOfTeams = reversed_0.size + 1 | 0;
    var iterator = reversed_0.iterator();
    var rounds = Math.log(numberOfTeams) / Math.log(2.0) | 0;
    var numberOfMatches = numberOfTeams / 2 | 0;
    tmp$ = until(0, rounds);
    tmp$_0 = tmp$.first;
    tmp$_1 = tmp$.last;
    tmp$_2 = tmp$.step;
    for (var counter = tmp$_0; counter <= tmp$_1; counter += tmp$_2) {
      var tempList = Kotlin.kotlin.collections.ArrayList_init_ww73n8$();
      tmp$_3 = until(0, numberOfMatches);
      tmp$_4 = tmp$_3.first;
      tmp$_5 = tmp$_3.last;
      tmp$_6 = tmp$_3.step;
      for (var i = tmp$_4; i <= tmp$_5; i += tmp$_6) {
        var elements = iterator.next().value;
        if (Kotlin.isType(elements, Partida$Finished))
          tmp$_7 = equipeResult(elements);
        else if (Kotlin.isType(elements, Partida$Scheduled))
          tmp$_7 = equipeResult_0(elements);
        else if (Kotlin.equals(elements, Partida$Empty_getInstance()))
          tmp$_7 = equipeResult_1(Partida$Empty_getInstance());
        else
          tmp$_7 = Kotlin.noWhenBranchMatched();
        var array = tmp$_7;
        tempList.add_11rb$(array);
      }
      var $receiver = reversed(tempList);
      finalList.add_11rb$(Kotlin.kotlin.collections.copyToArray($receiver));
      numberOfMatches = numberOfMatches / 2 | 0;
      if ((counter + 1 | 0) === rounds) {
        var final = list.iterator().next().value;
        if (Kotlin.isType(final, Partida$Finished))
          finalList.add_11rb$([[EquipeScore_init(final.winnner, null)]]);
        else
          finalList.add_11rb$([[EquipeScore_init(EQUIPE_TBD, null)]]);
      }
    }
    return JSON.stringify(Kotlin.kotlin.collections.copyToArray(finalList));
  }
  function bfs($receiver) {
    var queue = Kotlin.kotlin.collections.ArrayList_init_ww73n8$();
    var list = Kotlin.kotlin.collections.ArrayList_init_ww73n8$();
    queue.add_11rb$($receiver);
    while (!queue.isEmpty()) {
      var current = queue.removeAt_za3lpa$(0);
      list.add_11rb$(current);
      if (Kotlin.isType(current, Tree$Node)) {
        queue.add_11rb$(current.left);
        queue.add_11rb$(current.right);
      }
    }
    return toList(list);
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
  function EquipeScore(nome, codigo, id, score, seed) {
    this.nome = nome;
    this.codigo = codigo;
    this.id = id;
    this.score = score;
    this.seed = seed;
  }
  EquipeScore.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'EquipeScore',
    interfaces: []
  };
  function EquipeScore_init(equipe, score, seed, $this) {
    if (score === void 0)
      score = null;
    if (seed === void 0)
      seed = null;
    $this = $this || Object.create(EquipeScore.prototype);
    EquipeScore.call($this, equipe.nome, equipe.codigo, Math.abs(Kotlin.hashCode(equipe.codigo)).toString(), score, seed);
    return $this;
  }
  EquipeScore.prototype.component1 = function () {
    return this.nome;
  };
  EquipeScore.prototype.component2 = function () {
    return this.codigo;
  };
  EquipeScore.prototype.component3 = function () {
    return this.id;
  };
  EquipeScore.prototype.component4 = function () {
    return this.score;
  };
  EquipeScore.prototype.component5 = function () {
    return this.seed;
  };
  EquipeScore.prototype.copy_cvjyys$ = function (nome, codigo, id, score, seed) {
    return new EquipeScore(nome === void 0 ? this.nome : nome, codigo === void 0 ? this.codigo : codigo, id === void 0 ? this.id : id, score === void 0 ? this.score : score, seed === void 0 ? this.seed : seed);
  };
  EquipeScore.prototype.toString = function () {
    return 'EquipeScore(nome=' + Kotlin.toString(this.nome) + (', codigo=' + Kotlin.toString(this.codigo)) + (', id=' + Kotlin.toString(this.id)) + (', score=' + Kotlin.toString(this.score)) + (', seed=' + Kotlin.toString(this.seed)) + ')';
  };
  EquipeScore.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.nome) | 0;
    result = result * 31 + Kotlin.hashCode(this.codigo) | 0;
    result = result * 31 + Kotlin.hashCode(this.id) | 0;
    result = result * 31 + Kotlin.hashCode(this.score) | 0;
    result = result * 31 + Kotlin.hashCode(this.seed) | 0;
    return result;
  };
  EquipeScore.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.nome, other.nome) && Kotlin.equals(this.codigo, other.codigo) && Kotlin.equals(this.id, other.id) && Kotlin.equals(this.score, other.score) && Kotlin.equals(this.seed, other.seed)))));
  };
  function equipeResult($receiver) {
    return [EquipeScore_init($receiver.equipe1, $receiver.resultado.time1Pontos, $receiver.seed1), EquipeScore_init($receiver.equipe2, $receiver.resultado.time2Pontos, $receiver.seed2)];
  }
  function equipeResult_0($receiver) {
    return [EquipeScore_init($receiver.equipe1, void 0, $receiver.seed1), EquipeScore_init($receiver.equipe2, void 0, $receiver.seed2)];
  }
  function equipeResult_1($receiver) {
    return [EquipeScore_init($receiver.equipe1), EquipeScore_init($receiver.equipe2)];
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
      destination.add_11rb$(Equipe_init(item.nome, item.codigo));
    }
    var times = toList(destination);
    var teamsList = toMutableList(times);
    if (times.size === 2)
      tmp$ = new Tree$Leaf(null, 0, Partida$Empty_getInstance());
    else {
      while (teamsList.size % 4 !== 0)
        teamsList.add_11rb$(Equipe_init('WO', 'WO-' + Kotlin.toString(Math.random())));
      var levels = Math.log(teamsList.size / 2) / Math.log(2.0) | 0;
      tmp$ = buildTree(0, levels, NodePos$ROOT_getInstance(), null);
    }
    var root = tmp$;
    var numberOfRounds = Math.log(teamsList.size) / Math.log(2.0) | 0;
    buildSeeds(0, createSeeds(numberOfRounds).iterator(), toList(teamsList), root, numberOfRounds);
    return new Bracket(root);
  }
  function buildSeeds(index, seeds, teamsList, node, numberOfRounds) {
    if (Kotlin.isType(node, Tree$Node)) {
      buildSeeds(index + 1 | 0, seeds, teamsList, node.left, numberOfRounds);
      buildSeeds(index + 1 | 0, seeds, teamsList, node.right, numberOfRounds);
    }
     else if (Kotlin.isType(node, Tree$Leaf)) {
      var seed1 = seeds.next();
      var seed2 = seeds.next();
      node.value = new Partida$Scheduled(teamsList.get_za3lpa$(seed1 - 1 | 0), seed1, teamsList.get_za3lpa$(seed2 - 1 | 0), seed2);
    }
  }
  function createSeeds(numberOfRounds) {
    var tmp$, tmp$_0, tmp$_1, tmp$_2, tmp$_3;
    var seeds = [1, 2];
    tmp$ = downTo(numberOfRounds - 2 | 0, 0).iterator();
    while (tmp$.hasNext()) {
      var round = tmp$.next();
      var currentRound = [];
      tmp$_0 = until(0, seeds.length);
      tmp$_1 = tmp$_0.first;
      tmp$_2 = tmp$_0.last;
      tmp$_3 = tmp$_0.step;
      for (var match = tmp$_1; match <= tmp$_2; match += tmp$_3) {
        var numberOfTeamsInRound = seeds.length * 2 | 0;
        if (match % 2 === 0) {
          currentRound[match * 2 | 0] = seeds[match];
          currentRound[(match * 2 | 0) + 1 | 0] = numberOfTeamsInRound + 1 - seeds[match] | 0;
        }
         else {
          currentRound[match * 2 | 0] = numberOfTeamsInRound + 1 - seeds[match] | 0;
          currentRound[(match * 2 | 0) + 1 | 0] = seeds[match];
        }
      }
      seeds = currentRound;
    }
    return toList_0(seeds);
  }
  function addResultado(bracket, index, time1Pontos, time2Pontos) {
    var partidaNode = findMatch(bracket, index);
    if (partidaNode != null) {
      var tmp$, tmp$_0, tmp$_1, tmp$_2, tmp$_3, tmp$_4, tmp$_5;
      if (!Kotlin.isType(partidaNode.value, Partida$Scheduled)) {
        var message = 'Failed requirement.';
        throw new Kotlin.kotlin.IllegalArgumentException(message.toString());
      }
      var scheduled = Kotlin.isType(tmp$ = partidaNode.value, Partida$Scheduled) ? tmp$ : Kotlin.throwCCE();
      partidaNode.value = new Partida$Finished(scheduled.equipe1, scheduled.seed1, scheduled.equipe2, scheduled.seed2, new Resultado(time1Pontos, time2Pontos));
      if (partidaNode.parent != null && Kotlin.isType((Kotlin.isType(tmp$_0 = partidaNode.parent, Tree$Node) ? tmp$_0 : Kotlin.throwCCE()).value, Partida$Empty)) {
        var parentNode = Kotlin.isType(tmp$_1 = partidaNode.parent, Tree$Node) ? tmp$_1 : Kotlin.throwCCE();
        if (Kotlin.isType(parentNode.left.value, Partida$Finished) && Kotlin.isType(parentNode.right.value, Partida$Finished)) {
          parentNode.value = new Partida$Scheduled((Kotlin.isType(tmp$_2 = parentNode.left.value, Partida$Finished) ? tmp$_2 : Kotlin.throwCCE()).winnner, (Kotlin.isType(tmp$_3 = parentNode.left.value, Partida$Finished) ? tmp$_3 : Kotlin.throwCCE()).seedWinner, (Kotlin.isType(tmp$_4 = parentNode.right.value, Partida$Finished) ? tmp$_4 : Kotlin.throwCCE()).winnner, (Kotlin.isType(tmp$_5 = parentNode.right.value, Partida$Finished) ? tmp$_5 : Kotlin.throwCCE()).seedWinner);
        }
      }
    }
    return bracket;
  }
  function findMatch(bracket, index) {
    var list = toList(bracket);
    return index >= 0 && index < list.size ? list.get_za3lpa$(index) : null;
  }
  function buildTree(index, maxTreeHeight, pos, parentNode) {
    var tmp$, tmp$_0, tmp$_1;
    if (index > maxTreeHeight)
      throw new IllegalStateException();
    else if (index === maxTreeHeight) {
      tmp$_1 = new Tree$Leaf(parentNode, pos.calc((tmp$ = parentNode != null ? parentNode.index : null) != null ? tmp$ : 0), Partida$Empty_getInstance());
    }
     else {
      var node = new Tree$Node(parentNode, pos.calc((tmp$_0 = parentNode != null ? parentNode.index : null) != null ? tmp$_0 : 0), Partida$Empty_getInstance());
      node.left = buildTree(index + 1 | 0, maxTreeHeight, NodePos$LEFT_getInstance(), node);
      node.right = buildTree(index + 1 | 0, maxTreeHeight, NodePos$RIGHT_getInstance(), node);
      tmp$_1 = node;
    }
    return tmp$_1;
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
    }
  });
  Object.defineProperty(Tree$Node.prototype, 'value', {
    get: function () {
      return this.value_z6w9bi$_0;
    },
    set: function (value) {
      this.value_z6w9bi$_0 = value;
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
    }
  });
  Object.defineProperty(Tree$Leaf.prototype, 'value', {
    get: function () {
      return this.value_z5m82a$_0;
    },
    set: function (value) {
      this.value_z5m82a$_0 = value;
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
  var EQUIPE_TBD;
  function Partida() {
  }
  function Partida$Finished(equipe1, seed1, equipe2, seed2, resultado) {
    Partida.call(this);
    this.equipe1 = equipe1;
    this.seed1 = seed1;
    this.equipe2 = equipe2;
    this.seed2 = seed2;
    this.resultado = resultado;
    this.winnner = this.resultado.time1Pontos > this.resultado.time2Pontos ? this.equipe1 : this.equipe2;
    this.seedWinner = this.resultado.time1Pontos > this.resultado.time2Pontos ? this.seed1 : this.seed2;
  }
  Partida$Finished.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'Finished',
    interfaces: [Partida]
  };
  Partida$Finished.prototype.component1 = function () {
    return this.equipe1;
  };
  Partida$Finished.prototype.component2 = function () {
    return this.seed1;
  };
  Partida$Finished.prototype.component3 = function () {
    return this.equipe2;
  };
  Partida$Finished.prototype.component4 = function () {
    return this.seed2;
  };
  Partida$Finished.prototype.component5 = function () {
    return this.resultado;
  };
  Partida$Finished.prototype.copy_8asgo9$ = function (equipe1, seed1, equipe2, seed2, resultado) {
    return new Partida$Finished(equipe1 === void 0 ? this.equipe1 : equipe1, seed1 === void 0 ? this.seed1 : seed1, equipe2 === void 0 ? this.equipe2 : equipe2, seed2 === void 0 ? this.seed2 : seed2, resultado === void 0 ? this.resultado : resultado);
  };
  Partida$Finished.prototype.toString = function () {
    return 'Finished(equipe1=' + Kotlin.toString(this.equipe1) + (', seed1=' + Kotlin.toString(this.seed1)) + (', equipe2=' + Kotlin.toString(this.equipe2)) + (', seed2=' + Kotlin.toString(this.seed2)) + (', resultado=' + Kotlin.toString(this.resultado)) + ')';
  };
  Partida$Finished.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.equipe1) | 0;
    result = result * 31 + Kotlin.hashCode(this.seed1) | 0;
    result = result * 31 + Kotlin.hashCode(this.equipe2) | 0;
    result = result * 31 + Kotlin.hashCode(this.seed2) | 0;
    result = result * 31 + Kotlin.hashCode(this.resultado) | 0;
    return result;
  };
  Partida$Finished.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.equipe1, other.equipe1) && Kotlin.equals(this.seed1, other.seed1) && Kotlin.equals(this.equipe2, other.equipe2) && Kotlin.equals(this.seed2, other.seed2) && Kotlin.equals(this.resultado, other.resultado)))));
  };
  function Partida$Scheduled(equipe1, seed1, equipe2, seed2) {
    Partida.call(this);
    this.equipe1 = equipe1;
    this.seed1 = seed1;
    this.equipe2 = equipe2;
    this.seed2 = seed2;
  }
  Partida$Scheduled.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'Scheduled',
    interfaces: [Partida]
  };
  Partida$Scheduled.prototype.component1 = function () {
    return this.equipe1;
  };
  Partida$Scheduled.prototype.component2 = function () {
    return this.seed1;
  };
  Partida$Scheduled.prototype.component3 = function () {
    return this.equipe2;
  };
  Partida$Scheduled.prototype.component4 = function () {
    return this.seed2;
  };
  Partida$Scheduled.prototype.copy_8ej1s6$ = function (equipe1, seed1, equipe2, seed2) {
    return new Partida$Scheduled(equipe1 === void 0 ? this.equipe1 : equipe1, seed1 === void 0 ? this.seed1 : seed1, equipe2 === void 0 ? this.equipe2 : equipe2, seed2 === void 0 ? this.seed2 : seed2);
  };
  Partida$Scheduled.prototype.toString = function () {
    return 'Scheduled(equipe1=' + Kotlin.toString(this.equipe1) + (', seed1=' + Kotlin.toString(this.seed1)) + (', equipe2=' + Kotlin.toString(this.equipe2)) + (', seed2=' + Kotlin.toString(this.seed2)) + ')';
  };
  Partida$Scheduled.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.equipe1) | 0;
    result = result * 31 + Kotlin.hashCode(this.seed1) | 0;
    result = result * 31 + Kotlin.hashCode(this.equipe2) | 0;
    result = result * 31 + Kotlin.hashCode(this.seed2) | 0;
    return result;
  };
  Partida$Scheduled.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.equipe1, other.equipe1) && Kotlin.equals(this.seed1, other.seed1) && Kotlin.equals(this.equipe2, other.equipe2) && Kotlin.equals(this.seed2, other.seed2)))));
  };
  function Partida$Empty() {
    Partida$Empty_instance = this;
    Partida.call(this);
    this.equipe1 = EQUIPE_TBD;
    this.equipe2 = EQUIPE_TBD;
  }
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
  function Equipe(nome, codigo, id) {
    this.nome = nome;
    this.codigo = codigo;
    this.id = id;
  }
  Equipe.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'Equipe',
    interfaces: []
  };
  function Equipe_init(nome, codigo, $this) {
    $this = $this || Object.create(Equipe.prototype);
    Equipe.call($this, nome, codigo, Math.abs(Kotlin.hashCode(codigo)).toString());
    return $this;
  }
  Equipe.prototype.component1 = function () {
    return this.nome;
  };
  Equipe.prototype.component2 = function () {
    return this.codigo;
  };
  Equipe.prototype.component3 = function () {
    return this.id;
  };
  Equipe.prototype.copy_6hosri$ = function (nome, codigo, id) {
    return new Equipe(nome === void 0 ? this.nome : nome, codigo === void 0 ? this.codigo : codigo, id === void 0 ? this.id : id);
  };
  Equipe.prototype.toString = function () {
    return 'Equipe(nome=' + Kotlin.toString(this.nome) + (', codigo=' + Kotlin.toString(this.codigo)) + (', id=' + Kotlin.toString(this.id)) + ')';
  };
  Equipe.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.nome) | 0;
    result = result * 31 + Kotlin.hashCode(this.codigo) | 0;
    result = result * 31 + Kotlin.hashCode(this.id) | 0;
    return result;
  };
  Equipe.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.nome, other.nome) && Kotlin.equals(this.codigo, other.codigo) && Kotlin.equals(this.id, other.id)))));
  };
  function Bracket(root) {
    this.root = root;
  }
  Bracket.prototype.iterator = function () {
    return bfs(this.root).iterator();
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
  _.main_kand9s$ = main;
  var package$bracket = _.bracket || (_.bracket = {});
  package$bracket.prettyPrintForGracket = prettyPrint;
  package$bracket.bfs_f6ay2f$ = bfs;
  package$bracket.printTree = printTree;
  package$bracket.EquipeScore_init_ivb9s3$ = EquipeScore_init;
  package$bracket.EquipeScore = EquipeScore;
  package$bracket.equipeResult_6cfujo$ = equipeResult;
  package$bracket.equipeResult_e18z31$ = equipeResult_0;
  package$bracket.equipeResult_4i0bb7$ = equipeResult_1;
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
  package$bracket.createBracket = createBracket;
  package$bracket.buildSeeds_tgfmfs$ = buildSeeds;
  package$bracket.addResultado = addResultado;
  package$bracket.findMatch = findMatch;
  Tree.Node = Tree$Node;
  Tree.Leaf = Tree$Leaf;
  package$bracket.Tree = Tree;
  Object.defineProperty(package$bracket, 'EQUIPE_TBD', {
    get: function () {
      return EQUIPE_TBD;
    }
  });
  Partida.Finished = Partida$Finished;
  Partida.Scheduled = Partida$Scheduled;
  Object.defineProperty(Partida, 'Empty', {
    get: Partida$Empty_getInstance
  });
  package$bracket.Partida = Partida;
  package$bracket.Resultado = Resultado;
  package$bracket.Equipe_init_puj7f4$ = Equipe_init;
  package$bracket.Equipe = Equipe;
  package$bracket.Bracket = Bracket;
  EQUIPE_TBD = Equipe_init('TBD', 'TIME-TBD');
  main([]);
  Kotlin.defineModule('tourney', _);
  return _;
}(module.exports, require('kotlin')));
