Seguem abaixo instruções sobre este projeto, destinado ao teste técnico do processo seletivo da Mili.


**1 - ApiProdutos**


Contém uma REST API feita em Spring Boot e Java 8, utilizando "Eclipse IDE for Java Developers - 2024-09". O banco de dados utilizado é o PostgreSQL com pgAdmin 4. As configurações de dependencias estão
no arquivo "pom.xml" e as de conexão com o banco de dados no arquivo "application.properties". 


Instale o PostgreSQL e o pgAgmin 4 e configure de acordo com o "application.properties". As configurações são: localhost:5432, username-postgres, password=admin, database=testemili.
Se necessário, crie um role no pgAdmin com todas as permissões e atribua para a database em questão. Como o Hibernate está mapeado com o banco no "application.properties", basta chamar o endpoint de POST no Postman passando o JSON correto de acordo com a @Entity. Assim a tabela "produto" será criada automaticamente no banco de dados, já com todos os campos configurados e com o registro passado no JSON já inserido.
Para rodar o projeto, baixe o projeto "ApiProdutos" e importe como um "Maven Project" no Eclipse. De um "Maven install" no projeto para instalar todas as dependencias e depois rode com "botão direito em... ApiEstudarApplication.java -> Run As... -> Java Application". E procure uma mensagem no console do Eclipse parecida
com essa: "Started ApiEstudarApplication in 4.894 seconds (JVM running for 5.447)". Se você encontrar esta mensagem, quer dizer que a API está rodando.


**2 - MiliTechTest**


Este projeto é o front-end em Angular que contém as funcionalidades do sistema para o usuário utilizar. Este projeto consome a API presente em ApiProdutos.
Este projeto foi desenvolvido com o "WebStorm", por isso é recomendado que seja rodado com ele. Mas nada impede que seja utilizado "VS Code" ou "IntelliJ".
Como o projeto é um sistema desenvolvido em Angular, é necessário ter o Node.js instalado em sua máquina. Então baixe o Node.js 16 no site oficial e instale.


Talvez a variável de ambiente do sistema do Node não esteja setada no PATH após a instalação (para ambientes Windows), então cheque. Caso não esteja, você
deve setar. O caminho para colocar no PATH normalmente é: C:\Program Files\nodejs. Após isso é necessário reiniciar o computador. 


Depois, abra o prompt de comando (cmd) e rode o seguinte comando: npm install -g @angular/cli

Isso irá instalar a última versão do Angular, o Angular CLI 18, no seu computador. O Angular CLI é necessário para rodar o framework do Angular na sua máqiuna.
Para ver se o Angular CLI foi instalado com sucesso, rode esse comando: ng version

Depois, baixe o "WebStorm", de preferência "WebStorm 2024.3.1.1". Importe o projeto e rode o projeto com o comando "ng serve" no terminal do WebStorm. 
Depois acesse o sistema pela URL: http://localhost:4200/
Lembrando que para o sistema funcionar, a API ApiProdutos deve estar rodando e funcionando perfeitamente (para ter certeza, utilize o Postman.)
