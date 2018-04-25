package com.Conserto;
import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.*;
import java.lang.reflect.Array;
import java.net.*;
import java.util.ArrayList;
import java.util.Arrays;

class TCPServer {
    public static void main(String argv[]) throws Exception {
        String clientSentence;
        String capitalizedSentence;
        ServerSocket welcomeSocket = new ServerSocket(6789);
        System.out.println("Server Started...");
        while (true) {
            Socket connectionSocket = welcomeSocket.accept();
            BufferedReader inFromClient =
                    new BufferedReader(new InputStreamReader(connectionSocket.getInputStream()));
            DataOutputStream outToClient = new DataOutputStream(connectionSocket.getOutputStream());
            clientSentence = inFromClient.readLine();

            System.out.println("Received: " + clientSentence);

            File f = new File(clientSentence);
            if(f.exists() && !f.isDirectory()) {
                MyFile file = new MyFile("./logo.zpl");

                BufferedImage orginalImage = ImageIO.read(new java.io.File(clientSentence));
                ZplConverter zp = new ZplConverter();
                zp.setCompressHex(true);
                zp.setBlacknessLimitPercentage(50);
                String zpl = zp.convertfromImg(orginalImage);

                file.writeLines(new ArrayList<>(Arrays.asList(new String[]{zpl})));
                System.out.println("FIle written");

            }else{
                System.out.print(clientSentence + " is not a File");
            }



            capitalizedSentence = clientSentence.toUpperCase() + '\n';
            outToClient.writeBytes(capitalizedSentence);
        }
    }
}