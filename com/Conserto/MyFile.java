package com.Conserto;

import java.io.FileWriter;
import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

class MyFile {
    private String path;
    private List<String> lines;

    public MyFile(String path){
        this.path=path;
    }

    public List<String> readLines() throws IOException {
        this.lines = Files.readAllLines(Paths.get(this.path), Charset.forName("UTF-8"));
        return getLines();
    }

    public void writeLines(List<String> lines) throws IOException {
        FileWriter fw = new FileWriter(this.path);

        for (String line : lines) {
            fw.write(line);
        }
        fw.close();
    }

    public List<String> getLines(){
        return this.lines;
    }
}
