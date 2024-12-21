import mongoose from 'mongoose';
import app from './app';
import config from './config/index';

async function bootstrap() {
    const port = process.env.PORT || 5000;
  try {
    // Connect to MongoDB
    await mongoose.connect(config.database_url as string);

    // Start Express app
    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  } catch (error) {
    console.error('Error starting the application:', error);
  }
}

bootstrap();
