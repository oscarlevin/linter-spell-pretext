'use babel'

import { CompositeDisposable } from 'atom'

const languagePattern = /lang\s*=\s*"([^"]*)"/im
const grammarScopes = [
  'text.xml.pretext'
  // 'text.xml',
  // 'text.html.basic',          // language-html
  // 'text.embedded.html.basic', // from language-asciidoc, language-gfm
  // 'embedded.text.html.basic'  // from language-markdown
]

export default {
  disposables: null,

  provideGrammar () {
    function checkComments () {
      return atom.config.get('linter-spell-pretext.checkComments')
    }

    return [{
      grammarScopes: grammarScopes,
      findLanguageTags: textEditor => {
        let languages = []
        textEditor.scan(languagePattern, ({match, stop}) => {
          languages.push(match[1])
          stop()
        })
        return languages
      },
      checkedScopes: {
        'comment.block.xml': checkComments,
        'constant.character.entity.html': false,
        'constant.other.inline-data.html': false,
        'embedded.text.html.basic': true,
        'entity.name.tag.localname.xml': false,
        'entity.name.tag.xml': false,
        'text.embedded.html.basic': true,
        'meta.tag.preprocessor.xml': false,
        'meta.tag.xml': false,
        'constant.character.latex': false,
        'constant.other.reference.citation.latex': false,
        'constant.other.reference.latex': false,
        'keyword.control.cite.latex': false,
        'keyword.control.tex': false,
        'markup.raw.verb.latex': false,
        'markup.underline.link.latex': false,
        'meta.catcode.tex': false,
        'meta.definition.latex': false,
        'meta.embedded.block.generic': false,
        'meta.embedded.block.lua': false,
        'meta.embedded.block.python': false,
        'meta.embedded.block.source': false,
        'meta.embedded.line.r': false,
        'meta.function.begin-document.latex': false,
        'meta.function.end-document.latex': false,
        'meta.function.environment.latex.tikz': false,
        'meta.function.environment.math.latex': false,
        'meta.function.link.url.latex': false,
        'meta.function.memoir-alltt.latex': false,
        'meta.function.verb.latex': false,
        'meta.function.verbatim.latex': false,
        'meta.include.latex': false,
        'meta.preamble.latex': false,
        'meta.reference.latex': false,
        'meta.scope.item.latex': false,
        'punctuation.definition.string.begin.latex': false,
        'storage.type.function.latex': false,
        'storage.type.function.tex': false,
        'string.other.math.block.tex': false,
        'string.other.math.latex': false,
        'string.other.math.tex': false,
        'string.other.math.pretext': false,
        'support.function.be.latex': false,
        'support.function.emph.latex': false,
        'support.function.ExplSyntax.tex': false,
        'support.function.footnote.latex': false,
        'support.function.general.tex': false,
        'support.function.marginpar.latex': false,
        'support.function.marginpar.latex': false,
        'support.type.function.other.latex': false,
        'support.function.section.latex': false,
        'support.function.textbf.latex': false,
        'support.function.textit.latex': false,
        'support.function.texttt.latex': false,
        'support.function.url.latex': false,
        'support.function.verb.latex': false,
        'text.tex.latex': true,
        'text.tex': true,
        'text.xml.pretext': true,

      }
    }]
  },

  provideDictionary () {
    let wordList = require('linter-spell-word-list')
    let a = new wordList.ConfigWordList({
      name: 'PreTeXt',
      keyPath: 'linter-spell-pretext.words',
      grammarScopes: grammarScopes
    })
    this.disposables.add(a)
    return a.provideDictionary()
  },

  activate () {
    this.disposables = new CompositeDisposable()
    require('atom-package-deps').install('linter-spell-html')
      .then(() => {
        console.log('All dependencies installed, good to go')
      })
  },

  deactivate () {
    this.disposables.dispose()
  }
}
