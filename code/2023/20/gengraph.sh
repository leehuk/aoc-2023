#!/bin/sh

echo "digraph {" > graph.dot
cat $1 | perl -ne 'if($_ =~ /^(.*) -> (.*)/) { $idx = $1; $val = $2; $val =~ s/\s//g; foreach my $nval (split(",", $val)) { print("$idx -> $nval\n"); }}' | tr -d '&%' >> graph.dot
echo "}" >> graph.dot
