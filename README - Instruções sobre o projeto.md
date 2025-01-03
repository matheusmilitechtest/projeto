Seguem abaixo instruções sobre este projeto, destinado ao teste técnico do processo seletivo da Mili.


**1 - ApiProdutos**


Contém uma REST API feita em Spring Boot e Java 8, utilizando "Eclipse IDE for Java Developers - 2024-09". O banco de dados utilizado é o PostgreSQL com pgAdmin 4. As configurações de dependencias estão
no arquivo "pom.xml" e as de conexão com o banco de dados no arquivo "application.properties". Para rodar o projeto, baixe o projeto "ApiProdutos" e importe como um "Maven Project" no Eclipse. De um "Maven install"
no projeto para instalar todas as dependencias e depois rode com "botão direito em... ApiEstudarApplication.java -> Run As... -> Java Application". E procure uma mensagem no console do Eclipse parecida
com essa: "Started ApiEstudarApplication in 4.894 seconds (JVM running for 5.447)". Se você encontrar esta mensagem, quer dizer que a API está rodando.


**2 - MiliTechTest**


Este projeto é o front-end em Angular que contém as funcionalidades do sistema para o usuário utilizar. Este projeto consome a API presente em ApiProdutos.
Este projeto foi desenvolvido com o "WebStorm", por isso é recomendado que seja rodado com ele. Mas nada impede que seja utilizado "VS Code" ou "IntelliJ".
Baixe o "WebStorm", de preferência "WebStorm 2024.3.1.1". Importe o projeto e rode com "ng serve". Depois acesse o sistema pela URL: http://localhost:4200/
Lembrando que para o sistema funcionar, a API ApiProdutos deve estar rodando e funcionando perfeitamente (para ter certeza, utilize o Postman.)
