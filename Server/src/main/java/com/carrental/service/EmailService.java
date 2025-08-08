package com.carrental.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor

public class EmailService {

    private JavaMailSender mailSender;



    //@Autowired

   // private EmailRepository emailRepository;



    public void sendEmail(String to, String subject, String body) {

        try {

            MimeMessage message = mailSender.createMimeMessage();

            MimeMessageHelper helper = new MimeMessageHelper(message, true);



            // Set the sender's email address

            helper.setFrom("transithive.system@gmail.com");



            helper.setTo(to);

            helper.setSubject(subject);

            helper.setText(body, true);

            mailSender.send(message);



//            // Log email as sent

//            Email email = new Email(null, to, subject, body, LocalDateTime.now(), "SENT");

//            emailRepository.save(email);



        } catch (MessagingException e) {

//            // Log email as failed

//            Email email = new Email(null, to, subject, body, LocalDateTime.now(), "FAILED");

//            emailRepository.save(email);

            e.printStackTrace();

        }

    }

}