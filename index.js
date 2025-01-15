const express = require("express");
const app = express();
const fs = require("fs");
const codes = JSON.parse(fs.readFileSync("./codes.json", "utf8"));

const { set, get, isNull, isEmpty, find, isUndefined } = require("lodash");

app.get("/", function (req, res) {
  const answer = {};
  const code = get(req, "query.code");
  if (code) {
    const regex = /^(?<division>\d+)(\.(?<group>\d?)(?<klass>\d?))?$/y;

    const matches = regex.exec(code);

    if (!isNull(matches)) {
      const { division, group, klass } = matches.groups;

      if (!isEmpty(division)) {
        const termDevision = division;
        const d = find(codes, { Division: termDevision });

        if (!isUndefined(d)) {
          const _section = get(d, "Section");
          const _division = get(d, "Activity");

          set(answer, "section", _section);
          set(answer, "division", {
            description: _division,
            id: termDevision,
          });

          if (!isEmpty(group)) {
            const termGroup = `${division}.${group}`;
            const g = find(codes, { Division: termDevision, Group: termGroup });

            if (!isUndefined(g)) {
              const _group = get(g, "Activity");
              set(answer, "group", {
                description: _group,
                id: termGroup,
              });

              if (!isEmpty(klass)) {
                const termClass = `${division}.${group}${klass}`;
                const c = find(codes, {
                  Division: termDevision,
                  Group: termGroup,
                  Class: termClass,
                });

                if (!isUndefined(c)) {
                  const _class = get(c, "Activity");
                  set(answer, "class", {
                    description: _class,
                    id: termClass,
                  });
                }
              }
            }
          }
        }
      }
    }

    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(answer, null, 3));
  }
});

app.listen(3000);
