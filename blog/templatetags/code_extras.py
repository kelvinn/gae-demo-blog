from django import template
import re
import pygments

register = template.Library()

regex = re.compile(r'<code>(.*?)</code>', re.DOTALL)

def pygmentize(value):
    try:
        last_end = 0
        to_return = ''
        found = 0
        for match_obj in regex.finditer(value):
            code_string = match_obj.group(1)
            try:
                lexer = pygments.lexers.guess_lexer(code_string)
            except ValueError:
                lexer = pygments.lexers.PythonLexer()
            pygmented_string = pygments.highlight(code_string, lexer, pygments.formatters.HtmlFormatter())
            to_return = to_return + value[last_end:match_obj.start(1)] + pygmented_string
            last_end = match_obj.end(1)
            found = found + 1
        to_return = to_return + value[last_end:]
        return to_return
    except:
        return value
register.filter('pygmentize', pygmentize)